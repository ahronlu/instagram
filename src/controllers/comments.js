const Comment = require("../models/comment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

class Comments {
  async create(req, res) {
    const comment = new Comment({
      user: req.user._id,
      postId: req.params.id,
      content: req.body.content,
    });

    try {
      const createdComment = await comment.save();
      await createdComment.populate("user").execPopulate();
      res.status(201).json(createdComment);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async delete(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);

      if (comment.user._id.toString() === req.user._id) {
        res.sendStatus(401);
        return;
      }

      await Comment.findByIdAndRemove(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async get(req, res) {
    try {
      const comments = await Comment.find().populate(
        "user",
        ["avatar", "username"],
      );
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

module.exports = new Comments();
