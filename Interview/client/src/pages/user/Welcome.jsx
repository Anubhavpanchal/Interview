import React from 'react';
import { useNavigate } from 'react-router-dom';
import DG from '../../components/Admin/DG';

import { Box, Typography, Button, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Welcome = () => {
  const navigate = useNavigate();

  const goToRules = () => {
    navigate('/rules');
  };

  return (
    <>
      
      <Box className="min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] flex items-center justify-center px-4">
        <br/>
        <Paper elevation={6} className="max-w-2xl w-full p-10 rounded-2xl shadow-lg bg-white text-center">
          <Box className="flex flex-col items-center space-y-4">
            <SchoolIcon className="text-blue-600" style={{ fontSize: 60 }} />
            <Typography variant="h3" className="text-blue-800 font-bold tracking-wide">
              Welcome to the Quiz Portal
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Prepare to challenge yourself with our exciting quizzes.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={goToRules}
              className="mt-6 px-6 py-3 text-white text-lg tracking-wide"
            >
              Start Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Welcome;