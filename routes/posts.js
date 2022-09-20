import express from "express";
import {
  createPost,
  getPosts,
  getPostsByUser,
  likePost,
  deletePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getPosts);
router.get("/users/:id", auth, getPostsByUser);
router.patch("/:id/like", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;
