const express = require("express");
const joiningKeyGen = require("../AuxFunction/joiningKeyGenerator");
const connectToMongo = require("../db");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Quiz = require("../Models/Quiz");
const Notes = require("../Models/Quiz");
const User = require("../Models/User");

connectToMongo();

//Router 1: to create new quiz and associate it with particular user
router.post("/createquiz", fetchuser, async (req, res) => {
  try {
    let user = req.body.user.id;
    user = await User.findById(user);

    let joinKey = await joiningKeyGen();
    let quiz = await Quiz.create({
      quizName: req.body.quizName,
      joiningKey: joinKey,
      noOfRounds: req.body.roundDetails.length,
      roundDetails: req.body.roundDetails,
    });

    user.ownedQuizzes.push({ quizId: quiz._id });
    await user.save();
    res.send(quiz);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("internal server error");
  }
});

//Route 2: to add rounds in a quiz
router.post("/addround", fetchuser, async (req, res) => {
  try {
    const targetQuiz = await Quiz.findById(req.body.quizId);
    //Validastion for Duplicate Names
    let isDuplicate = false;
    for(let i in targetQuiz.roundDetails){
        if(targetQuiz.roundDetails[i].roundName===req.body.roundName){
            isDuplicate = true;
        }}
        if(!isDuplicate){
            const round = {
              roundName: req.body.roundName,
              modeOfQuiz: req.body.modeOfQuiz,
              noOfQuestion: req.body.questionList.length,
              questionList: req.body.questionList,
            };
            targetQuiz.roundDetails.push(round);
            targetQuiz.noOfRounds = targetQuiz.roundDetails.length;
            await targetQuiz.save();
            res.send(targetQuiz.roundDetails);
        }
        else{
            res.send({error: "name of round already exists"});
        }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 3: Delet rounds from a quiz
router.delete("/deletround",fetchuser,async (req,res)=>{
    try {
        const quiz = await Quiz.findById(req.body.quizId);
        quiz.roundDetails=quiz.roundDetails.filter((round)=>{
            return round._id.toString()!==req.body.roundId;
        })
        await quiz.save();
        res.send(quiz.roundDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;
