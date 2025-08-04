import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

const Thanks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = new URLSearchParams(location.search).get('quizId');

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] px-4">
      <Paper
        elevation={6}
        className="w-full max-w-lg p-8 md:p-12 text-center rounded-xl shadow-xl bg-white"
      >
        <Typography
          variant="h4"
          className="font-bold text-blue-800 mb-4 tracking-wide"
        >
          🎉 Thank You!
        </Typography>
        <Typography
          variant="body1"
          className="text-gray-700 mb-6 leading-relaxed"
        >
          Your responses have been submitted successfully. <br />
          We really appreciate your participation in the quiz!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/result/${quizId}`)}
          className="px-6 py-2 text-white text-lg"
        >
          See Result
        </Button>
      </Paper>
    </Box>
  );
};

export default Thanks;