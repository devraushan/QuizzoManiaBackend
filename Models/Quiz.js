import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const quizSchema = new Schema({
  quizId: { type: String, required: true, unique: true },
  joiningKey: { type: String, required: true },
  assignedUsers: [{ userId: { type: String } }],
  blockList: [{ userId: { type: String } }],
  noOfRounds: { type: Number, required: true },
  roundDetails: [
    {
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
