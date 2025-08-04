import React, { useState, useEffect } from 'react';
import {
  Button, Typography, Box, Dialog, DialogTitle, DialogContent,
  useMediaQuery, Switch, FormControlLabel, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SetIcons, { iconList } from '../../components/Admin/SetIcons';
import { useTheme } from '@mui/material/styles';
import AdminQuestion from '../../components/Admin/AdminQuestions';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const iconMap = Object.fromEntries(iconList.map(item => [item.name, item.icon]));

const SetTest = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [quizName, setQuizName] = useState('');
  const [icon, setIcon] = useState('SportsEsports');
  const [shuffle, setShuffle] = useState(false);
  const [questions, setQuestions] = useState([
    { id: uuid(), text: '', choices: ['', '', '', ''], correct: '', timer: 60 },
  ]);
  const [iconDialog, setIconDialog] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

 useEffect(() => {
  if (quizId && quizId !== 'null' && quizId !== 'undefined') {
    axios.get(`/api/quizzes/${quizId}`)
      .then(res => {
        const quiz = res.data;
        setQuizName(quiz.name);
        setIcon(quiz.icon);
        setShuffle(quiz.shuffle);
        setQuestions(quiz.questions);
      })
      .catch(err => {
        // Optionally handle error, e.g. show toast
      });
  }
}, [quizId]);

  const handleQuestionChange = (index, field, value, choiceIdx) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === index
          ? field === 'choice'
            ? { ...q, choices: q.choices.map((c, idx) => (idx === choiceIdx ? value : c)) }
            : { ...q, [field]: value }
          : q
      )
    );
  };

  const handleDelete = (index) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: uuid(), text: '', choices: ['', '', '', ''], correct: '', timer: 60 }]);
  };

  const validateQuiz = () => {
    if (!quizName.trim()) return false;
    for (const q of questions) {
      if (!q.text.trim()) return false;
      if (q.choices.some((c) => !c.trim())) return false;
      if (!q.correct.trim()) return false;
    }
    return true;
  };

  const handleSave = async () => {
    setShowValidation(true);
    if (!validateQuiz()) return;
    const quizData = {
      name: quizName,
      icon,
      shuffle,
      questions,
    };
    if (quizId) {
      await axios.put(`/api/quizzes/${quizId}`, quizData);
    } else {
      await axios.post('/api/quizzes', quizData);
    }
    navigate('/admin/add-test');
  };

  return (
    <div   
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-10 px-2"
      style={{
        backgroundImage: `url('/bg.jpg')`,
      }}
    >
      <Box className="max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-blue-200 shadow-2xl rounded-xl">
        <Typography variant="h4" className="font-bold mb-10  text-blue-900">
          {quizId ? 'Edit Quiz' : 'Create a New Quiz'}
        </Typography>
        <Box className=" border bg-white border-gray shadow-inner p-6 rounded-lg mb-10">
          <TextField
            label="Quiz Name"
            variant="outlined"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            fullWidth
            error={showValidation && !quizName.trim()}
            helperText={showValidation && !quizName.trim() ? "Quiz name is required." : ''}
            className="mb-6"
          />
          <Box className="flex items-center justify-between mt-2 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Choose Icon:</span>
              <Button onClick={() => setIconDialog(true)} variant="outlined" className="flex items-center gap-2">
                {iconMap[icon] && React.createElement(iconMap[icon], { fontSize: 'medium' })}
              </Button>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={shuffle}
                  onChange={() => setShuffle(!shuffle)}
                  color="primary"
                />
              }
              label="Shuffle Questions"
            />
          </Box>
        </Box>
        <Dialog open={iconDialog} onClose={() => setIconDialog(false)}>
          <DialogTitle>Select Icon</DialogTitle>
          <DialogContent>
            <SetIcons
              selected={icon}
              onSelect={(iconName) => {
                setIcon(iconName);
                setIconDialog(false);
              }}
            />
          </DialogContent>
        </Dialog>
        {questions.map((q, index) => (
          <Box key={q.id} className="bg-white shadow-lg border border-gray-100 p-6 rounded-xl mb-12 mt-12">
            <AdminQuestion
              index={index}
              question={q}
              handleChange={handleQuestionChange}
              handleDelete={handleDelete}
              showValidation={showValidation}
            />
          </Box>
        ))}
        <Box className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-12 mb-24">
          <Button startIcon={<AddIcon />} variant="outlined" onClick={addQuestion}>
            Add Question
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Quiz
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SetTest;