import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography, Card, CardContent } from "@mui/material";

const ReportForm = () => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [reportType, setReportType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ longitude, latitude, reportType });
    alert(`Report submitted: Longitude - ${longitude}, Latitude - ${latitude}, Type - ${reportType}`);
  };

  return (
    <Box display="flex" justifyContent="flex-end" height="100vh" padding={2}>
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" marginBottom={2}>
              Submit a Report
            </Typography>

            <TextField
              label="Longitude"
              variant="outlined"
              fullWidth
              margin="normal"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
            />

            <TextField
              label="Latitude"
              variant="outlined"
              fullWidth
              margin="normal"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
            />

            <TextField
              select
              label="Type of Report"
              variant="outlined"
              fullWidth
              margin="normal"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="Fire">Fire</MenuItem>
              <MenuItem value="Earthquake">Earthquake</MenuItem>
              <MenuItem value="Covid">Covid</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportForm;
