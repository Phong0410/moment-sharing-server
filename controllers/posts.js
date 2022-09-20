import mongoose from "mongoose";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { name, message, image } = req.body;
  const newPost = new Post({ name, message, image, creator: req.userId });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPostsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ creator: id }).sort({ createdAt: "desc" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "No post with that id" });

    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id");
    }

    await Post.findByIdAndRemove(_id);
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Some thing went wrong" });
  }
};
