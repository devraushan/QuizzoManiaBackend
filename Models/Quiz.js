const mongoose = require("mongoose");
const { mongo } = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
  quizName: { type: String, required: true },
  joiningKey: { type: String, required: true, unique: true },
  assignedUsers: [{ userId: { type: String } }],
  blockList: [{ userId: { type: String } }],
  noOfRounds: { type: Number, required: true },
  isActive: { type: Boolean },
  roundDetails: [
    {
      roundName: { type: String },
      noOfQuestion: { type: Number },
      modeOfQuiz: { type: String },
      questionList: [
        {
          questionId: { type: String },
          marksAssigned: {
            onTrue: { type: Number },
            onFalse: { type: Number },
            onUnattempted: { type: Number },
          },
        },
      ],
      roundLeaderBoard: [{ userId: { type: String }, score: { type: Number } }],
    },
  ],
  overallLeaderBoard: [{ userId: { type: String }, score: { type: Number } }],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
