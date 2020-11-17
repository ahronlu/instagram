const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const Post = mongoose.model("Post", {
  user: { type: ObjectId, ref: "User", required: true },
  description: String,
  image: { type: String, required: true },
  likes: [ObjectId],
  createdAt: { type: Date, default: new Date() },
});

module.exports = Post;
