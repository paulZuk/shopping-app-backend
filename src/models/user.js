import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: String,
  password: String,
  email: String,
  createDate: Date,
  role: String,
});

export default mongoose.model("User", userSchema);
