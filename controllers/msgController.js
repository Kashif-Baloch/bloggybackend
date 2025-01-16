import Msg from "../models/MsgModel.js";

const addMsg = async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    if (!(name, email, msg)) {
      return res.status(500).json({ msg: "please fill all the fields" });
    }
    const newMsg = await Msg.create({ name, email, msg });
    return res.json({ msg: "message sent successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const getMsgs = async (req, res) => {
  try {
    const msgData = await Msg.find();
    return Object.keys(msgData).length >= 1
      ? res.json({ msgData })
      : res.status(404).json({ msg: "no messages found" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const deleteMsg = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(500).json({ msg: "please provide message id" });
    }
    const deletedMsg = await Msg.findByIdAndDelete({ _id: id });
    return deletedMsg.deletedCount >= 1
      ? res.json({ msg: "message deleted successfully" })
      : res.status(404).json({ msg: "message not found" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const deleteMsgs = async (req, res) => {
  try {
    const deletedMsgs = await Msg.deleteMany();

    return deletedMsgs.deletedCount >= 1
      ? res.json({ msg: "all messages deleted successfully" })
      : res.status(404).json({ msg: "no messages found" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const controllers = {
  addMsg,
  getMsgs,
  deleteMsg,
  deleteMsgs,
};

export default controllers;
