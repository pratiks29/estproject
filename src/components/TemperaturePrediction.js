// src/components/TemperaturePrediction.js

'use client';
import { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import TemperatureImageDisplay from './TemperatureImageDisplay';

export default function TemperaturePrediction() {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Input validation: Ensure the input is a valid year
    const year = parseInt(inputText, 10);
    if (isNaN(year) || year < 0) {
      setError("Please enter a valid year.");
      setOutput(null);
      return;
    }

    setLoading(true);
    setOutput(null);
    setError('');

    try {
      const response = await fetch('/api/run-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: year })
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Error communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        backgroundImage: `url('/bgcalm.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: 'Lato, sans-serif',
      }}
    >
      {/* Left Section: Form */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          width: '30%',
          padding: 2,
          boxSizing: 'border-box',
          borderRight: '1px solid #ddd',
          fontFamily: 'Lato, sans-serif',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Lato, sans-serif' }}>
          Temperature Prediction range - 2015 to 2115
        </Typography>
        <TextField
          label="Enter Year"
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          fullWidth
          sx={{ mb: 2, fontFamily: 'Lato, sans-serif' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mb: 2, fontFamily: 'Lato, sans-serif' }}
          disabled={loading}
        >
          Run Python Script
        </Button>

        {/* Loading Screen */}
        {loading && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: 2,
              p: 2,
              width: '100%',
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: '#f5f5f5',
              fontFamily: 'Lato, sans-serif',
              minHeight: '100px',
            }}
          >
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 1, fontFamily: 'Lato, sans-serif' }}>
              Loading, please wait...
            </Typography>
          </Box>
        )}

        {/* Error Message */}
        {error && !loading && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              width: '100%',
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: '#ffe6e6',
              color: '#cc0000',
              fontFamily: 'Lato, sans-serif',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.25rem', fontFamily: 'Lato, sans-serif' }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Output Box */}
        {output && !loading && !error && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              width: '100%',
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: '#f5f5f5',
              fontFamily: 'Lato, sans-serif',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Lato, sans-serif' }}>
              Output:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1" sx={{ fontSize: '1rem', fontFamily: 'Lato, sans-serif' }}>
                <strong>Year:</strong> {inputText}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', fontFamily: 'Lato, sans-serif' }}>
                <strong>Predicted CO₂ Emissions:</strong> {output.CO2_emissions.toFixed(2)} tons
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', fontFamily: 'Lato, sans-serif' }}>
                <strong>Predicted GHG Emissions:</strong> {output.GHG_emissions.toFixed(2)} tons
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', fontFamily: 'Lato, sans-serif' }}>
                <strong>Predicted Ice Sheet Loss:</strong> {output.Predicted_Ice_Sheet_Loss.toFixed(2)} cubic kilometers
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', fontFamily: 'Lato, sans-serif' }}>
                <strong>Predicted Temperature:</strong> {output.Predicted_Temperature.toFixed(2)} °C
              </Typography>
            </Box>
          </Box>
        )}

        {/* Display Threat and Description Below Output */}
        {output && !loading && !error && (
          <Box sx={{ mt: 2 }}>
            <TemperatureImageDisplay output={parseFloat(output.Predicted_Temperature)} onlyText />
          </Box>
        )}
      </Box>

      {/* Right Section: Temperature Image Display */}
      <Box sx={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {output && !loading && !error && <TemperatureImageDisplay output={parseFloat(output.Predicted_Temperature)} onlyImage />}
      </Box>
    </Box>
  );
}
