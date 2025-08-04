import React from 'react';
import { Box, Button } from '@mui/material';

const NavigationGrid = ({ questions, current, answers, onJump }) => {
  return (
    <Box
      className="
        grid 
        grid-cols-4 
        sm:grid-cols-5 
        md:grid-cols-6 
        lg:grid-cols-8 
        xl:grid-cols-10 
        gap-3 
        mb-6 
        p-4 
        bg-white 
        shadow-md 
        rounded-lg 
        w-full
      "
    >
      {questions.map((_, i) => (
        <Button
          key={i}
          onClick={() => onJump(i)}
          variant={i === current ? 'contained' : 'outlined'}
          color={answers[i] ? 'success' : 'error'}
          className="!min-w-[40px] !px-0 !py-1"
        >
          {i + 1}
        </Button>
      ))}
    </Box>
  );
};

export default NavigationGrid;
