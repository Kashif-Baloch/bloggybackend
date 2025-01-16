import express from "express";
import fetchUser from "../middlewares/tokenextracter.js";
import controllers from "../controllers/blogController.js";
import upload from "../middlewares/blogImageUploader.js";

const router = express.Router();

router.get("/getblogs", controllers.getBlogs);
router.get("/getblog", controllers.getBlog);
router.get("/filterblogs", controllers.filterBlogs);
router.delete("/deleteblog", controllers.deleteBlog);
router.post("/addblog", upload.single("image"), fetchUser, controllers.addBlog);
router.put("/updateblog", fetchUser, controllers.updateBlog);

export default router;
