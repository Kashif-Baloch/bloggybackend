import express from "express";
import upload from "../middlewares/userImageUploader.js";
import controllers from "../controllers/userController.js";
import fetchUser from "../middlewares/tokenextracter.js";

const router = express.Router();

router.post("/signup", upload.single("image"), controllers.signUser);

router.post("/login", controllers.loginUser);

router.get("/getuser", fetchUser, controllers.getUser);

router.get("/getusers", fetchUser, controllers.getUsers);

router.delete("/deleteuser", fetchUser, controllers.deleteUser);

router.delete("/deleteusers", fetchUser, controllers.deleteUsers);

export default router;
