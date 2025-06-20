const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body.postData;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newPost = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    const populatedPost = await Post.findById(newPost._id).populate(
      "author",
      "name email"
    );

    res.status(201).json(populatedPost);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isPublic: true })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch public posts",
      error: err.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author._id.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    if (!req.body.postData.title || !req.body.postData.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required for update" });
    }

    post.title = req.body.postData.title || post.title;
    post.content = req.body.postData.content || post.content;
    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author._id.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { name, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ name, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: err.message });
  }
};
