// components/MyButton.js
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

const MyButton = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap={2} // Adds spacing between the buttons
    >
      <Link href="/temperature" passHref>
        <Button variant="contained" color="primary">
          Go to Temperature Prediction
        </Button>
      </Link>

      <Link href="/questionnaire" passHref>
        <Button variant="contained" color="secondary">
          Go to Questionnaire
        </Button>
      </Link>
    </Box>
  );
};

export default MyButton;
