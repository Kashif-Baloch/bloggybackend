import express from "express";
import controllers from "../controllers/msgController.js";

const router = express.Router();

router.post("/addmsg", controllers.addMsg);
router.get("/getmsgs", controllers.getMsgs);
router.delete("/deletemsg", controllers.deleteMsg);
router.delete("/deletemsgs", controllers.deleteMsgs);

export default router;
