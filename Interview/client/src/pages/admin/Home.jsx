import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import DG from '../../components/Admin/DG';

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("/api/quizzes").then(res => setQuizzes(res.data));
  }, []);

  const handleMyQuiz = () => {
    if (!quizzes.length) {
      toast.info("You don't have any quiz yet!");
    } else {
      navigate("/admin/add-test");
    }
  };

  const handleCreateQuiz = () => {
    navigate("/admin/set-test");
  };

  return (
      <>
      
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url('/bg1.jpg')`,
      }}
    >
      <div className=" bg-opacity-20 rounded-xl shadow-xl p-8 sm:p-12 max-w-xl w-full text-center backdrop-blur-sm">
        <Typography
          variant="h4"
          className="font-bold text-white mb-6 leading-snug"
        >
          Welcome to the <br />
          <span className="text-blue-300">Quiz Builder Admin Dashboard</span>
        </Typography>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button
            variant="contained"
            size="large"
            onClick={handleMyQuiz}
            className="w-full sm:w-auto bg-blue-300"
            style={{ color: "#fff" }}
          >
            My Quiz
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleCreateQuiz}
            className="w-full sm:w-auto"
            style={{ color: "#fff", borderColor: "#fff" }}
          >
            Create New Quiz
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;