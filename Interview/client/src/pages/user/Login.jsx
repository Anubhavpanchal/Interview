import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ username: '', email: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = new URLSearchParams(location.search).get('quizId');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { username, email } = form;
    if (!username.trim()) return toast.error("Username is required.");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return toast.error("Valid email is required.");

    // Admin shortcut
    if (
      username.trim() === "Admin@DG" &&
      email.trim().toLowerCase() === "admin1@dg.com"
    ) {
      navigate("/admin/home");
      return;
    }

    const element = document.documentElement;
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else {
      toast.warn("Please press F11 to enter full screen.");
    }

    navigate(`/test/${quizId}?username=${username.trim()}&email=${email.trim()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] flex items-center justify-center px-4">
      <Paper elevation={6} className="w-full max-w-md md:p-10 p-6 rounded-xl shadow-lg bg-white">
        <Typography variant="h4" className="text-blue-800 font-bold mb-6 text-center">
          🎓 Welcome to Quiz Portal
        </Typography>
        <Typography className="text-gray-600 mb-8 text-center text-sm">
          Enter your details to begin the test. All the best!
        </Typography>
        <Box className="flex flex-col gap-6">
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            type="email"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            className="py-3 text-white tracking-wide font-medium"
          >
            Start Test
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;