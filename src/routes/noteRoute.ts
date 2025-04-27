import express from "express";
import noteModel from "../models/noteModel";

const router = express.Router();

router.post("/addNote", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new noteModel({
      title,
      content,
      createdDate: new Date(),
      updatedDate: new Date(),
    });
    console.log("req.body:", req.body);
    await newNote.save();
    res.send(newNote);
  } catch (err) {
    console.log(err);
    res.status(500).send("Someting went wrong !");
  }
});

export default router;
