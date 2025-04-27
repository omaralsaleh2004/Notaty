import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  createdDate : Date,
  updatedDate : Date
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, required: true },
  updatedDate: { type: Date, required: true },
});

const noteModel = mongoose.model<INote>("Note", noteSchema);
export default noteModel;
