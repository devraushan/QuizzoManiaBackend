const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  questionStatement: { type: String, required: true },
  isMcq: { type: Boolean, required: true },
  options: [{ optName: { type: String }, optValue: { type: Number } }],
  answer: { type: String, required: true },
  createdBy: { type: String }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
 