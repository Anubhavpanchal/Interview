import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

const Timer = ({ duration, onExpire }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    setSeconds(duration);
  }, [duration]); // Only reset when duration changes

  useEffect(() => {
    if (duration <= 0) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onExpire]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = seconds <= 10;

  return (
    <Box
      className={`w-fit px-4 py-2 rounded-lg mb-4 font-semibold shadow-md ${
        isLowTime ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-800'
      }`}
    >
      <Typography variant="body1">
        ⏱️ Time left: <span className="font-bold">{formatTime(seconds)}</span>
      </Typography>
    </Box>
  );
};

export default Timer;
