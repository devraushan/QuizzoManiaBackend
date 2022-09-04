const express = require("express");
const connectToMongo = require("../db");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Quiz = require("../Models/Quiz");
const User = require("../Models/User");

router.post("/start:quizId",fetchuser,async (req,res)=>{
    
    try {
        const user = await User.findById(req.body.user.id);
        let authTest=[];
        
        authTest = user.ownedQuizzes.filter((ele)=>{return ele.quizId===req.params.quizId});
        if(authTest.length!==0){
            const quiz = await Quiz.findById(authTest[0].quizId);
            quiz.isActive=true;
            await quiz.save();
            quizDeployer();
        }
        else{
            res.status(404).send("Quiz Not Found");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }

    

})

const quizDeployer = async ()=>{
    connectToMongo();
    quizzes = await Quiz.find({isActive:true});
    for(let n in quizzes){
        console.log(quizzes[n])
        router.post(`/run/${quizzes[n]._id.toString()}`,(req,res)=>{
            res.send("quizisrunning");
        })
    }
}

module.exports = router