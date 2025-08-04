import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#4ade80', '#f87171'];

const Result = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('user');
  const [quiz, setQuiz] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios.get(`/api/quizzes/${quizId}`).then(res => setQuiz(res.data));
    axios.get(`/api/quizzes/responses/${quizId}`).then(res => {
      if (email) {
        setResponse(res.data.find(r => r.email === email));
      } else {
        setResponse(res.data[res.data.length - 1]);
      }
    });
  }, [quizId, email]);

  if (!quiz || !response) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const percent = ((response.score / quiz.questions.length) * 100).toFixed(1);
  const pieData = [
    { name: 'Correct', value: response.score },
    { name: 'Incorrect', value: response.attempted - response.score },
  ];

  const handleExit = () => {
    alert('Thanks for taking the quiz!');
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dbeafe] px-4 py-8 flex justify-center items-start">
      <Paper elevation={6} className="w-full max-w-3xl p-6 md:p-10 rounded-xl shadow-md bg-white">
        <Typography variant="h4" className="text-blue-800 font-bold mb-6 text-center">
          🧠 Quiz Summary
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Typography><b>Quiz:</b> {quiz.name}</Typography>
          <Typography><b>Username:</b> {response.username}</Typography>
          <Typography><b>Email:</b> {response.email}</Typography>
          <Typography><b>Total Questions:</b> {quiz.questions.length}</Typography>
          <Typography><b>Attempted:</b> {response.attempted}</Typography>
          <Typography className="text-green-600"><b>Correct:</b> {response.score}</Typography>
        </Box>
        <Box className="text-center mb-4">
          <Typography variant="h5" className="font-semibold text-blue-700">
            You scored <span className="text-green-600">{percent}%</span>
          </Typography>
        </Box>
        <Box className="w-full h-64 mb-8">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box className="text-center">
          <Button variant="contained" color="primary" onClick={handleExit}>
            Exit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Result;