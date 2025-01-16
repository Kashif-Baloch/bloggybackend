import mongoose from "mongoose";
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Object, required: true },
  bodycontent: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
