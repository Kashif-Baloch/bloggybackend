// creating a user schema for a blog using mongoose

import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now() },
});

let User = mongoose.model("User", UserSchema);

export default User;
