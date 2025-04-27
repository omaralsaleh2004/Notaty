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
    const {title}: any = req.query;
    if (title) {
      const query = { title: { $regex:title, $options:"i"} };
      const note = await noteModel.find(query);
      res.status(200).send(note);
    } else {
      const notes = await noteModel.find();
      res.status(200).send(notes);
    }
  } catch (err) {
    console.log(err)
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
    res.status(500).send("Someting went wrong !");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    let note = await noteModel.findById(id);
    if (!note) {
      res.status(404).send("the note does not exist !");
      return;
    }

    note.title = title;
    note.content = content;
    note.updatedDate = new Date();

    await note.save();
    res.status(200).send(note);
  } catch (err) {
    res.status(500).send("Someting went wrong !");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let note = await noteModel.findByIdAndDelete(id);
    if (!note) {
      res.status(404).send("the note does not exist !");
      return;
    }

    res.status(200).send("note has been deleted !");
  } catch (err) {
    res.status(500).send("Someting went wrong !");
  }
});

export default router;
