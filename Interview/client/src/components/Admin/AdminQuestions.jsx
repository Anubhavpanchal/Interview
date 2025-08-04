import React from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminQuestion = ({ index, question, handleChange, handleDelete, showValidation }) => {
  const isChoiceEmpty = question.choices.some((c) => c.trim() === '');
  const isQuestionEmpty = question.text.trim() === '';
  const isCorrectEmpty = question.correct.trim() === '';

  return (
    <Box className="border p-4 mb-6 rounded-lg shadow bg-white">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="font-semibold">
          Question {index + 1}
        </Typography>
        <Tooltip title="Delete this question">
          <IconButton onClick={() => handleDelete(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <TextField
        label="Question Text"
        name="text"
        value={question.text}
        onChange={(e) => handleChange(index, 'text', e.target.value)}
        fullWidth
        className="mb-6 mt-4"
        error={showValidation && isQuestionEmpty}
        helperText={showValidation && isQuestionEmpty ? 'Question is required' : ''}
      />

      <Box className="flex gap-4 mb-6 mt-6 flex-wrap">
        {question.choices.map((choice, i) => {
          const isEmpty = choice.trim() === '';
          return (
            <TextField
              key={i}
              label={`Choice ${String.fromCharCode(65 + i)}`}
              name={`choice-${i}`}
              value={choice}
              onChange={(e) => handleChange(index, 'choice', e.target.value, i)}
              error={showValidation && isEmpty}
              helperText={showValidation && isEmpty ? 'Required' : ''}
              sx={{ minWidth: 160, maxWidth: 200 }}
              size="small"
            />
          );
        })}
      </Box>

      <Box className="flex gap-4 mb-6 mt-6 flex-wrap items-center">
        <FormControl
          sx={{ minWidth: 160, maxWidth: 180 }}
          size="small"
          error={showValidation && isCorrectEmpty}
        >
          <InputLabel>Correct Answer</InputLabel>
          <Select
            value={question.correct}
            label="Correct Answer"
            onChange={(e) => handleChange(index, 'correct', e.target.value)}
          >
            <MenuItem value="a">A</MenuItem>
            <MenuItem value="b">B</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="d">D</MenuItem>
          </Select>
          {showValidation && isCorrectEmpty && (
            <Typography color="error" variant="caption" sx={{ ml: 1 }}>
              Correct answer is required
            </Typography>
          )}
        </FormControl>

        <TextField
          label="Timer (s)"
          type="number"
          value={question.timer || 60}
          onChange={(e) => handleChange(index, 'timer', e.target.value)}
          sx={{ minWidth: 120, maxWidth: 140 }}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default AdminQuestion;