import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get Request from notaty");
});

export default router;
