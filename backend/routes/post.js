// routes/post.js
const express = require("express");
const auth = require("../middleware/auth");
const {
  createPost,
  getMyPosts,
  getPost,
  updatePost,
  deletePost,
  addComment,
} = require("../controllers/post");

const router = express.Router();

router.get("/", auth, getMyPosts);
router.get("/:id", auth, getPost);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.post("/:id/comments", addComment);

module.exports = router;
