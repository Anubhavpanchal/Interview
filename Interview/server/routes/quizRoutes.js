const express = require("express");
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  submitResponse,
  getResponses,
} = require("../controllers/quizController");

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/", createQuiz);
router.post("/submit", submitResponse);
router.get("/responses/:quizId", getResponses);
router.put("/:id", require("../controllers/quizController").updateQuiz);
router.delete("/:id", require("../controllers/quizController").deleteQuiz);

module.exports = router;
