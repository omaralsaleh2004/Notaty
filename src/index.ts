import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoute from "./routes/noteRoute";
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected !"))
  .catch((err) => console.log("Failed to connect !", err));

app.use("/notes", noteRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
