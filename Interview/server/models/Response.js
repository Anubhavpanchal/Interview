const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  quizId: String,
  username: String,
  email: String,
  answers: Object,
  score: Number,
  attempted: Number,
}, { timestamps: true });

module.exports = mongoose.model("Response", responseSchema);
