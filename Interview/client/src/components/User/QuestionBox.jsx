import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';

const QuestionBox = ({ question, index, selectedAnswer, handleAnswer }) => {
  return (
    <Paper
      elevation={3}
      className="p-5 md:p-6 mb-6 rounded-xl shadow-md bg-white"
    >
      <Typography
        variant="subtitle1"
        className="font-semibold text-gray-800 mb-4"
      >
        {`Q${index + 1}. ${question.text}`}
      </Typography>

      <RadioGroup
        value={selectedAnswer}
        onChange={(e) => handleAnswer(index, e.target.value)}
        className="space-y-2"
      >
        {question.choices.map((choice, i) => (
          <FormControlLabel
            key={i}
            value={choice}
            control={<Radio color="primary" />}
            label={
              <Typography className="text-gray-700">{choice}</Typography>
            }
            className="hover:bg-blue-50 px-3 py-2 rounded-md transition duration-150"
          />
        ))}
      </RadioGroup>
    </Paper>
  );
};

export default QuestionBox;
