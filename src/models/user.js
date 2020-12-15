const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  bio: { type: String, default: "Please enter some bio." },
  avatar: { type: String, default: "no-img.jpg" },
  followers: [ObjectId],
  following: [ObjectId],
  createdAt: { type: Date, default: new Date() },
});

module.exports = User;
