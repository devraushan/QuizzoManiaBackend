import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
  questionId: {type: String, required: true, unique: true},
  questionStatement: {type: String , required: true},
  isMcq: {type: Boolean, required: true},
  options: [{optName:{type:String},optValue:{type:Number}}],
  answer:{type:String, required: true}
});

const Question = mongoose.model("Question",questionSchema);

module.exports = Question;