import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  university: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  file: { type: String }, // Store file path or filename
});

export default mongoose.model("Course", courseSchema);
