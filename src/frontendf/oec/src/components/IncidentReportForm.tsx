import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black-600 p-6 text-white shadow-md">
      <div className="mx-auto items-center">
        {/* Links */}
        <div className="md:flex flex-row gap-4 justify-center items-center w-full">
          <div className="justify-center w-full">
            <div>
              <Link to="/earthquake" className="hover:text-blue-300 mx-2">
                Earthquakes
              </Link>
            </div>
            <div>
              <Link to="/covid" className="hover:text-blue-300 mx-2">
                Covid Cases
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function IncidentReportForm() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [reportType, setReportType] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ longitude, latitude, reportType });
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    zIndex: 100,
  };

  const formContainerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "400px",
    padding: "24px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "24px",
    alignSelf: "flex-end",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    outline: "none",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1.5em 1.5em",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 16px",
    fontSize: "16px",
    fontWeight: "500",
    color: "white",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Incident Report</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label htmlFor="longitude" style={labelStyle}>
              Longitude
            </label>
            <input
              id="longitude"
              type="number"
              step="any"
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="latitude" style={labelStyle}>
              Latitude
            </label>
            <input
              id="latitude"
              type="number"
              step="any"
              placeholder="Enter latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="report-type" style={labelStyle}>
              Report Type
            </label>
            <select
              id="report-type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              required
              style={selectStyle}
            >
              <option value="">Select report type</option>
              <option value="fire">Fire</option>
              <option value="earthquake">Earthquake</option>
              <option value="covid">Covid</option>
            </select>
          </div>
          <button type="submit" style={buttonStyle}>
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
