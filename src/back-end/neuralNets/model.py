import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
import numpy as np
import math


#Data Preprocessing
#load CSV
df = pd.read_csv("data/covid_data.csv", parse_dates=["case_reported_date_column_in_years"])

#create day_index
start_date = df["case_reported_date_column_in_years"].min()
df["day_index"] = (df["case_reported_date_column_in_years"] - start_date).dt.days

#Rename columns to lat/lon & get rid of what we dont need
df.rename(columns={
    "Reporting_PHU_Latitude": "lat",
    "Reporting_PHU_Longitude": "lon"
}, inplace=True)
df = df[["day_index", "lat", "lon"]].dropna()

#Creates a train/test split by day_index
max_day = df["day_index"].max()
train_cutoff = int(0.8 * max_day)  # e.g. 80% of the timeline

df_train = df[df["day_index"] <= train_cutoff].copy()
df_test  = df[df["day_index"] > train_cutoff].copy()

print("Train days:", df_train["day_index"].min(), "to", df_train["day_index"].max())
print("Test  days:", df_test["day_index"].min(), "to", df_test["day_index"].max())
print("Train samples:", len(df_train), "Test samples:", len(df_test))


#Scaling the data
lat_mean = df_train["lat"].mean()
lat_std  = df_train["lat"].std()
lon_mean = df_train["lon"].mean()
lon_std  = df_train["lon"].std()

day_min = df_train["day_index"].min()  # typically 0
day_max = df_train["day_index"].max()

def scale_day(d):
    return (d - day_min) / (day_max - day_min + 1e-8)

def scale_lat(lat):
    return (lat - lat_mean) / (lat_std + 1e-8)

def scale_lon(lon):
    return (lon - lon_mean) / (lon_std + 1e-8)

#Applying to train/test
df_train["day_scaled"] = df_train["day_index"].apply(scale_day)
df_train["lat_scaled"] = df_train["lat"].apply(scale_lat)
df_train["lon_scaled"] = df_train["lon"].apply(scale_lon)

df_test["day_scaled"] = df_test["day_index"].apply(scale_day)
df_test["lat_scaled"] = df_test["lat"].apply(scale_lat)
df_test["lon_scaled"] = df_test["lon"].apply(scale_lon)


#Loading the data into PyTorch
class CovidPointsDataset(Dataset):
    def __init__(self, df):
        #df with columns: day_scaled, lat_scaled, lon_scaled
        self.samples = df[["day_scaled", "lat_scaled", "lon_scaled"]].values.astype(np.float32)

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        #day, lat, lon
        d, lat_s, lon_s = self.samples[idx]
        #keeps day as shape (1,) for convenience
        return torch.tensor([d], dtype=torch.float32), torch.tensor([lat_s, lon_s], dtype=torch.float32)

#Instantiate
train_dataset = CovidPointsDataset(df_train)
test_dataset  = CovidPointsDataset(df_test)

batch_size = 128
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)


#___________________________________________________________
#creating the actual model
noise_dim = 8  #dimension of random noise

class Generator(nn.Module):
    def __init__(self, noise_dim=8, hidden_dim=32):
        super().__init__()
        #Input: day_cond (1D) + noise_dim
        #Output: 2D (lat, lon)
        self.fc1 = nn.Linear(noise_dim + 1, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, 2)
    
    def forward(self, day_cond, z):
        #day_cond: shape (batch, 1)
        #z: shape (batch, noise_dim)
        x = torch.cat([day_cond, z], dim=1)  # shape (batch, 1+noise_dim)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        out = self.fc3(x)  # shape (batch, 2)
        return out


class Discriminator(nn.Module):
    def __init__(self, hidden_dim=32):
        super().__init__()
        #Input: day_cond (1D) + lat,lon (2D) = 3 total
        #Output: 1 scalar (real/fake)
        self.fc1 = nn.Linear(3, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, 1)
    
    def forward(self, day_cond, latlon):
        #day_cond: (batch, 1)
        #latlon:   (batch, 2)
        x = torch.cat([day_cond, latlon], dim=1)  # shape (batch, 3)
        x = F.leaky_relu(self.fc1(x), 0.2)
        x = F.leaky_relu(self.fc2(x), 0.2)
        out = self.fc3(x)  # shape (batch, 1)
        return out

#instantiate
G = Generator(noise_dim=noise_dim, hidden_dim=64)
D = Discriminator(hidden_dim=64)

#Ensure consistent tensor dtype for all inputs and model layers
G = G.float()
D = D.float()


#___________________Training__________________________________
#training prepp
lr = 1e-4
adversarial_loss = nn.BCEWithLogitsLoss()

optimizer_G = optim.Adam(G.parameters(), lr=lr)
optimizer_D = optim.Adam(D.parameters(), lr=lr)

epochs = 2


#Training loop
for epoch in range(epochs):
    for day_cond, latlon_real in train_loader:
        batch_size_real = day_cond.size(0)

        # Train DISCRIMINATOR
        D.zero_grad()
        
        # 1) Real samples
        real_labels = torch.ones(batch_size_real, 1, dtype=torch.float32)
        pred_real = D(day_cond, latlon_real)
        loss_real = adversarial_loss(pred_real, real_labels)
        
        # 2) Fake samples
        z = torch.randn(batch_size_real, noise_dim, dtype=torch.float32)  # random noise
        latlon_fake = G(day_cond, z)
        fake_labels = torch.zeros(batch_size_real, 1, dtype=torch.float32)
        pred_fake = D(day_cond, latlon_fake.detach())  # detach so G not updated here
        loss_fake = adversarial_loss(pred_fake, fake_labels)
        
        d_loss = loss_real + loss_fake
        d_loss.backward()
        optimizer_D.step()
        

        # Train GENERATOR
        G.zero_grad()
        # Generate again
        z = torch.randn(batch_size_real, noise_dim, dtype=torch.float32)
        latlon_fake = G(day_cond, z)
        # We want D to think these are real => label=1
        pred_fake_for_G = D(day_cond, latlon_fake)
        g_loss = adversarial_loss(pred_fake_for_G, real_labels)
        g_loss.backward()
        optimizer_G.step()
    
    print(f"Epoch [{epoch+1}/{epochs}] | D_loss: {d_loss.item():.4f} | G_loss: {g_loss.item():.4f}")


#Generating future data
def generate_cases_for_day(day_index, N_cases=100):
    #1) scale day
    d_scaled = scale_day(day_index)
    # turn it into a tensor shape (N_cases, 1)
    d_cond = torch.tensor([[d_scaled]], dtype=torch.float32).repeat(N_cases, 1)
    
    #2) random noise
    z = torch.randn(N_cases, noise_dim, dtype=torch.float32)
    
    #3) generate scaled lat/lon
    latlon_fake_scaled = G(d_cond, z).detach()  # shape (N_cases, 2)
    
    #4) unscale
    latlon_fake = []
    for i in range(N_cases):
        lat_s, lon_s = latlon_fake_scaled[i]
        lat = lat_s.item() * lat_std + lat_mean
        lon = lon_s.item() * lon_std + lon_mean
        latlon_fake.append((lat, lon))
    return latlon_fake

#generate 100 future points for day 251
predicted_points_day_251 = generate_cases_for_day(251, N_cases=100)
print(predicted_points_day_251[:5])

#Createing the CSV for MapBox
all_future_points = []
for future_day in range(251, 261):  #day 251..260
    #Suppose you predict N_cases=50 for each day
    day_points = generate_cases_for_day(future_day, N_cases=50)
    for (lat, lon) in day_points:
        all_future_points.append({
            "day_index": future_day,
            "lat": lat,
            "lon": lon
        })

df_future = pd.DataFrame(all_future_points)
df_future.to_csv("future_predictions.csv", index=False)
