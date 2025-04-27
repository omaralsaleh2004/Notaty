import express from "express";
import noteModel from "../models/noteModel";
import mongoose, { ObjectId } from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).send(notes);
  } catch (err) {
    res.status(500).send("Someting went wrong !");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let note = await noteModel.findById(id);
    if (!note) {
      res.status(404).send("the note does not exist !");
      return;
    }

    res.status(200).send(note);
  } catch (err) {
    console.log(err);
    res.status(500).send("Someting went wrong !");
  }
});

export default router;
