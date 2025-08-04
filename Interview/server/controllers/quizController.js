const Quiz = require("../models/Quiz");
const Response = require("../models/Response");

exports.getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

exports.getQuizById = async (req, res) => {
  if (!req.params.id || req.params.id === 'null' || req.params.id === 'undefined') {
    return res.status(400).json({ error: 'Invalid quiz ID' });
  }
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
};

exports.updateQuiz = async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(quiz);
};

exports.deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: "Quiz deleted" });
};


exports.createQuiz = async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.status(201).json(newQuiz);
};

exports.submitResponse = async (req, res) => {
  const { quizId, username, email, answers } = req.body;
  const quiz = await Quiz.findById(quizId);
  let score = 0, attempted = 0;

  quiz.questions.forEach((q, idx) => {
    const ans = answers[idx];
    if (ans?.trim()) attempted++;
    if (ans && q.correct && ans === q.correct) score++;
  });

  const newResponse = new Response({ quizId, username, email, answers, score, attempted });
  await newResponse.save();

  res.status(201).json({ message: "Response saved", score, attempted });
};

exports.getResponses = async (req, res) => {
  const responses = await Response.find({ quizId: req.params.quizId });
  res.json(responses);
};
