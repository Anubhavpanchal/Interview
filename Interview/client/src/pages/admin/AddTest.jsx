import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import AdminQuizCard from '../../components/Admin/AdminQuizCard';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddTest = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/quizzes').then(res => setQuizzes(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/quizzes/${id}`);
    setQuizzes(quizzes.filter(q => q._id !== id));
    toast.success('Quiz deleted successfully');
  };

  const handleResponse = (quizId) => {
    navigate(`/admin/all-users/${quizId}`);
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('Quiz ID copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-200 py-10 px-4">
      <Box className="max-w-6xl mx-auto">
        <Typography variant="h4" className=" font-bold text-blue-900 mb-15">
          Your Quizzes
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {quizzes.map((quiz) => (
            <Box key={quiz._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <AdminQuizCard quiz={{ ...quiz, id: quiz._id }} onDelete={handleDelete} />
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleCopy(quiz._id)}
                className="mt-4"
              >
                Copy Link
              </Button>
            </Box>
          ))}
          <Box
            onClick={() => navigate('/admin/set-test')}
            className="h-[250px] w-full sm:w-[250px] border-2 border-dashed border-gray-400 hover:border-blue-500 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 bg-white shadow-sm"
          >
            <Typography variant="h2" className="text-gray-500 hover:text-blue-500">+</Typography>
          </Box>
        </div>
        <Box className="bg-white shadow-lg rounded-xl p-6">
          <Typography variant="h5" className="font-semibold text-blue-900 mb-6 text-center sm:text-left">
            All Test Responses
          </Typography>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg mb-4 bg-slate-50 hover:bg-slate-100 transition">
                <span className="text-lg font-medium text-gray-700 mb-2 sm:mb-0">{quiz.name}</span>
                <Button variant="outlined" size="small" onClick={() => handleResponse(quiz._id)}>
                  See Responses
                </Button>
              </div>
            ))
          ) : (
            <Typography className="text-gray-600 text-center">No quizzes yet.</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AddTest;