import React from "react"

const App: React.FC = () => {
  const disasters = [
    { name: "Earthquakes", link: "https://api.mapbox.com/styles/v1/shadielfares/cm6bd1epw003x01shhy4mhhl1.html?title=view&access_token=pk.eyJ1Ijoic2hhZGllbGZhcmVzIiwiYSI6ImNtM2JvODd1dzFnYWoyanB4OTJzcGgxY2wifQ.yvzs3YBCnmy8gSQNDXpIyA&zoomwheel=true&fresh=true#3.28/61.67/-101.44" },
    { name: "Wildfires", link: "https://api.mapbox.com/styles/v1/shadielfares/cm6bc5z3b00ag01qr0mtr3pn5.html?title=view&access_token=pk.eyJ1Ijoic2hhZGllbGZhcmVzIiwiYSI6ImNtM2JvODd1dzFnYWoyanB4OTJzcGgxY2wifQ.yvzs3YBCnmy8gSQNDXpIyA&zoomwheel=true&fresh=true#3.31/51.84/-110.04" },
    { name: "Covid", link: "https://api.mapbox.com/styles/v1/shadielfares/cm6bf7j5w002t01qo0bj00g5c.html?title=view&access_token=pk.eyJ1Ijoic2hhZGllbGZhcmVzIiwiYSI6ImNtM2JvODd1dzFnYWoyanB4OTJzcGgxY2wifQ.yvzs3YBCnmy8gSQNDXpIyA&zoomwheel=true&fresh=true#1.27/62.2/-75.4" },
  ]

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <nav
        style={{
          backgroundColor: "#d9534f",
          padding: "1rem",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Natural Disaster Info Hub</h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {disasters.map((disaster) => (
              <a
                key={disaster.name}
                href={disaster.link}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f0ad4e",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                {disaster.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <main
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "1rem" }}>Welcome to the Natural Disaster Information Center</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Stay informed about various natural disasters and learn how to prepare and respond effectively.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {disasters.map((disaster) => (
            <div
              key={disaster.name}
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ color: "#d9534f", marginBottom: "0.5rem" }}>{disaster.name}</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                Learn about {disaster.name.toLowerCase()} and how to stay safe.
              </p>
              <a
                href={disaster.link}
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#5bc0de",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                More Info
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App

