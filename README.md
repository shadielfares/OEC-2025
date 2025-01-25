# OEC-2025- AlertME
Team Ariana Grande Presents – AlertMe

## Proof of AI:

![Proof of AI](src/frontend/f/oec/assets/proofOFAI.png)

## Project Overview:
This project aims to build better communication between Canadians during times of crisis by allowing users to report and visualize ongoing issues during times of crisis whether that be spreading virus or natural disaster, all while using this geographic data to help people plan for future emergency situations using a predictive generative AI model that we built from scratch.

## To run our project:
in the backend directory
```
Python -m venv .venv
```
```
.venv\Scripts\Activate.ps1
```
```
uvicorn api.main:app --reload
```

in the front-end directory
```
npm run dev
```
## Tech-Stack + Data Sources:
We built a react app using Vite and utilized FastAPI to communicate with MapBox to visualize the data geographically. We used Pytorch to build our AI model and used COVID-19 data from the government of Ontario to train it. The wild fire data was collected from the Canadian National Forestry Database and the Earthquake data was collected from the Government of Canada site.

## Code Diagram:
![image](https://github.com/user-attachments/assets/3daa1161-7c03-49b2-802f-931cb9d2def9)


## AI Model Details
Our model is examining a dataset consisting of reported cases of COVID-19 in Ontario. This includes when it was reported, and which latitude and longitude the case was reported at. Our model then extrapolates the data, and generates a prediction for the next year in the future. This way, we can take preventative measures by knowing almost exactly how the disease will spread
