import mongoose from "mongoose";
import { UserSchema } from "./user";

const Schema = mongoose.Schema;

const listSchema = new Schema({
  userId: String,
  listName: String,
  priority: String,
  shared: [UserSchema],
  items: [],
});

export default mongoose.model("List", listSchema);
