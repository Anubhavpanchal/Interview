import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizzes: [],
  selectedQuiz: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },
    setSelectedQuiz: (state, action) => {
      state.selectedQuiz = action.payload;
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((q) => q.id !== action.payload);
    },
    updateQuiz: (state, action) => {
      const idx = state.quizzes.findIndex((q) => q.id === action.payload.id);
      if (idx !== -1) state.quizzes[idx] = action.payload;
    },
  },
});

export const { addQuiz, setSelectedQuiz, deleteQuiz, updateQuiz } = quizSlice.actions;
export default quizSlice.reducer;
