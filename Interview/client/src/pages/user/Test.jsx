import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Timer from '../../components/User/Timer';
import QuestionBox from '../../components/User/QuestionBox';
import axios from 'axios';
import { toast } from 'react-toastify';

const Test = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username = new URLSearchParams(location.search).get('username');
  const email = new URLSearchParams(location.search).get('email');

  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timerKey, setTimerKey] = useState(0);

  // 🔐 Prevent right-click
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // 🔐 Track Fullscreen status
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        toast.error("You exited fullscreen! The test may be submitted.");
        submitTest(); // Auto-submit
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    axios.get(`/api/quizzes/${quizId}`).then(res => setQuiz(res.data));
  }, [quizId]);

  useEffect(() => {
    setTimerKey((prev) => prev + 1);
  }, [currentIndex]);

  const handleAnswer = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const nextQuestion = useCallback(() => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, quiz]);

  const submitTest = useCallback(async () => {
    let score = 0;
    let attempted = 0;
    if (quiz && quiz.questions) {
      quiz.questions.forEach((q, idx) => {
        const ans = answers[idx];
        if (ans && ans.trim() !== '') attempted++;
        if (ans && q.correct && ans === q.correct) score++;
      });
    }
    await axios.post('/api/quizzes/submit', {
      quizId,
      username,
      email,
      answers,
    });
    navigate(`/thanks?quizId=${quizId}`);
  }, [answers, quizId, navigate, quiz, username, email]);

  const handleExpire = useCallback(() => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitTest();
    }
  }, [currentIndex, quiz, submitTest]);

  if (!quiz)
    return (
      <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb]">
        <Box className="text-center">
          <CircularProgress color="primary" />
          <Typography variant="h6" className="mt-4 text-gray-600">
            Preparing your quiz...
          </Typography>
        </Box>
      </Box>
    );

  const currentQuestion = quiz.questions[currentIndex];
  const timerDuration = currentQuestion.timer || 60;

  return (
    <Box className="min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] py-10 px-4 flex items-center justify-center">
      <Paper elevation={4} className="w-full max-w-5xl p-6 md:p-10 rounded-lg bg-white shadow-lg">
        <Box className="mb-6 flex items-center justify-between flex-wrap gap-2">
          <Typography variant="h4" className="text-blue-800 font-extrabold tracking-wide">
            {quiz.name}
          </Typography>
          <Timer key={timerKey} duration={timerDuration} onExpire={handleExpire} />
        </Box>
        <QuestionBox
          question={currentQuestion}
          index={currentIndex}
          selectedAnswer={answers[currentIndex] || ''}
          handleAnswer={handleAnswer}
        />
        <Box className="mt-6 flex justify-end">
          {currentIndex < quiz.questions.length - 1 ? (
            <Button variant="contained" color="primary" onClick={nextQuestion} className="px-6 py-2 text-white">
              Next
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={submitTest} className="px-6 py-2 text-white">
              Submit Test
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Test;
