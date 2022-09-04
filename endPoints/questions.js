const express = require("express");
const connectToMongo = require("../db");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Question = require("../Models/Question");
const User = require("../Models/User");

//Route 1: Create Questions after authentication
router.post("/addquestion", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.body.user.id);
    const question = await Question.create({
      questionStatement: req.body.questionStatement,
      isMcq: req.body.isMcq,
      options: req.body.options,
      answer: req.body.answer,
      createdBy: user.userName,
    });
    res.send({ staus: "question added successfully", question });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
