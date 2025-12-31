import mongoose from "mongoose";
const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  mood: String,
  tags: [String],
  date: Date
}, { timestamps: true });
export default mongoose.model("Journal", journalSchema);
