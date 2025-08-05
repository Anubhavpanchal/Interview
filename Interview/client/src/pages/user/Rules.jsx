import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

const Rules = () => {
  const { quizId: paramQuizId } = useParams();
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (paramQuizId) setQuizId(paramQuizId);
  }, [paramQuizId]);

  
  const handleStart = () => {
    if (!quizId.trim()) return toast.error("Quiz ID is required.");
    toast.info("Please enable fullscreen before continuing.");
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    navigate(`/login?quizId=${quizId.trim()}`);
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-200 px-4 py-10">
      <Paper elevation={4} className="w-full max-w-6xl p-8 sm:p-10 text-center">
        <Typography variant="h4" className="text-blue-900 font-bold mb-6">
          📋 Quiz Instructions
        </Typography>
        <TextField
          label="Enter Quiz ID"
          variant="outlined"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          fullWidth
          className="mb-6"
        />
        <Box className="text-left text-gray-700 text-base sm:text-lg mb-6">
          <ul className="list-disc list-inside space-y-2">
            <li>You must remain in fullscreen mode during the entire quiz.</li>
            <li>Switching tabs or minimizing the window will auto-submit the test.</li>
            <li>Each question must be answered within 1 minute. Unanswered questions will be marked incorrect.</li>
            <li>Use of external help or multiple devices is prohibited.</li>
            <li>Once started, the quiz cannot be paused or restarted.</li>
            <li>Your responses will be submitted automatically once the timer ends.</li>
            <li>Do not refresh or close the window during the quiz.</li>
            <li>Ensure a stable internet connection before starting.</li>
            <li>Only one attempt is allowed per user unless permitted by admin.</li>
            <li>Clicking "Start Test" will enter fullscreen and begin the quiz immediately.</li>
          </ul>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          fullWidth
          className="text-white font-semibold py-2"
        >
          Start Test
        </Button>
      </Paper>
    </Box>
  );
};

export default Rules;
