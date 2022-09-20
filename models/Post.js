import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  creator: String,
  message: String,
  image: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
