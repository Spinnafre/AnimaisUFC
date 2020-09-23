import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,dropDups: true },
    path: { type: String, required: true,unique:true},
    url: { type: String, required: true},
  },
  { timestamps: true }
);

const FileModel = mongoose.model("File", FileSchema);

export default FileModel;
