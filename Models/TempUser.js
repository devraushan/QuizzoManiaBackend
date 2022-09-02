import mongoose from 'mongoose';
const { Schema } = mongoose;

const tmpUserSchema = new Schema({
  userName: String,
  userId: {type:String, unique: true, required: true},
  displayName: String
});

const TmpUser = mongoose.model("TmpUser",tmpUserSchema)