import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  login: String,
  password: String,
  email: String,
  createDate: Date,
  role: String,
});

export default mongoose.model("User", UserSchema);
