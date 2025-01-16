// creating a blog schema for a blog using mongoose

import mongoose from "mongoose";
const { Schema } = mongoose;

const MsgSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  msg: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const Msg = mongoose.model("Msg", MsgSchema);

export default Msg;
