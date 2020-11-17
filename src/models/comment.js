const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const Comment = mongoose.model("Comment", {
  user: { type: ObjectId, required: true, ref: "User" },
  postId: { type: ObjectId, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = Comment;
