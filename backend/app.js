const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
