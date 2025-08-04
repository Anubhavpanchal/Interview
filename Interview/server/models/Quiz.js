const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ["mcq", "text"] },
  choices: [String],
  correct: String,
});

const quizSchema = new mongoose.Schema({
  name: String,
  icon: String,
  time: Number,
  shuffle: Boolean,
  questions: [questionSchema],
});

module.exports = mongoose.model("Quiz", quizSchema);
