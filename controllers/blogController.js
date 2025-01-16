import path from "path";
import Blog from "../models/BlogModel.js";
import User from "../models/UserModel.js";
import fs from "fs";
import { log } from "console";

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ _id: -1 });
    return Object.keys(blogs).length < 1
      ? res.status(500).json({ msg: "blogs collection is empty" })
      : res
          .status(200)
          .json({ msg: "blogs are exist in the collection", blogs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const filterBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.query.filterItem }).sort({
      _id: -1,
    });
    return Object.keys(blogs).length < 1
      ? res.status(500).json({ msg: "blogs collection is empty" })
      : res
          .status(200)
          .json({ msg: "blogs are exist in the collection", blogs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.query.id });
    return !blog
      ? res.status(500).json({ msg: "blogs collection is empty" })
      : res
          .status(200)
          .json({ msg: "blogs are exist in the collection", blog });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, bodycontent, category } = req.body;
    const author = await User.findOne({ email: req.user });

    if (!author) return res.status(404).json({ msg: "user not found" });
    const authorObj = {
      name: author.name,
      email: author.email,
      image: author.image,
    };

    const created_blog = await Blog.create({
      title,
      author: authorObj,
      bodycontent,
      category,
      image: req.file.filename,
    });

    return res.status(200).json({ msg: "blog created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id, title, category } = req.body;

    const update = { title, category };

    // console.log(update);

    const updated_blog = await Blog.findOneAndUpdate({ _id: id }, update, {
      new: true,
      upsert: true,
    });

    console.log(updated_blog);

    return res
      .status(200)
      .json({ msg: "blog updated successfully", updated_blog });
    // return res.status(200).json({ msg: "blog updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { img } = req.body;
    const deleted_blog = await Blog.findByIdAndDelete({ _id: req.query.id });
    const directoryPath = "uploads/blogImages";
    fs.readdir(directoryPath, (err) => {
      if (err) {
        console.error("Error reading directory:", err.message);
        return res.status(500).json({ msg: err.message });
      } else {
        const filePath = path.join(directoryPath, img);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err.message);
            return res.status(500).json({ msg: err.message });
          } else {
            console.log("File deleted:", filePath);
          }
        });
      }
    });
    return res.status(200).json({ msg: "blog deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const deleteBlogs = (req, res) => {
  try {
    const deleted_blogs = Blog.deleteMany();

    const directoryPath = "uploads/blogImages";
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err.message);
        return res.status(500).json({ msg: err.message });
      }

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).json({ msg: err.message });
          } else {
            console.log("File deleted:", filePath);
          }
        });
      });
    });

    return res.status(200).json({ msg: "all blogs deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const controllers = {
  getBlogs,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
  filterBlogs,
  deleteBlogs,
};

export default controllers;
