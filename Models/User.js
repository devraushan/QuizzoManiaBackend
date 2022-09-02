import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  displayName:{ type: String, required: true},
  userName: { type: String, required: true,unique: true},
  email: { type: String, unique: true,},
  dateOfJoining: {type: Date, default: Date.now},
  password: {type: String, requird: true},  
  ownedQuizzes: [{quizId: {type: String}}]
});

const User = mongoose.model("User",userSchema);

module.exports = User;