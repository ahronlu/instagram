const md5 = require("md5");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const config = require("../config/env/index");
const { ObjectId } = mongoose.Types;
const ERROR_DUPLICATE_VALUE = 11000;
const DURATION_60D = 60 * 60 * 24 * 60 * 1000;

class Users {
  async getAll(req, res) {
    const regex = new RegExp(req.query.username || "", "i");
    try {
      const users = await User.find({ username: regex })
        .select(["username", "avatar", "bio"])
        .limit(10);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id).select([
        "username",
        "avatar",
        "bio",
        "following",
        "followers",
      ]);
      if (!user) {
        res.sendStatus(400);
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async check(req, res) {
    const { username, email } = req.query;

    if (!username && !email) {
      res.sendStatus(400);
      return;
    }
    let property = email ? "email" : "username";

    try {
      const isExist = await User.exists({
        [property]: req.query[property],
      });
      res.json(isExist);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async create(req, res) {
    const { username, password } = req.body;

    if (!username && !password) {
      res.sendStatus(400);
      return;
    }
    
    const newUser = new User(req.body);
    newUser.password = md5(newUser.password);
    try {
      const createdUser = await newUser.save();
      res.status(201).json(createdUser);
    } catch (err) {
      if (err.code === ERROR_DUPLICATE_VALUE) {
        res.sendStatus(409);
        return;
      }
      res.status(400).json(err);
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username && !password) {
      res.sendStatus(400);
      return;
    }
    
    try {
      const user = await User.findOne({
        username: req.body.username,
        password: md5(req.body.password),
      });
      if (!user) {
        res.sendStatus(401);
        return;
      }
      // success
      const token = jwt.sign({ id: user._id }, config.secret);
      res.cookie(config.cookieName, token, {
        maxAge: DURATION_60D,
        httpOnly: true,
      });
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie(config.cookieName);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }

  me(req, res) {
    res.json(req.user);
  }

  async getPosts(req, res) {
    try {
      const posts = await Post.find({ user: ObjectId(req.params.id) })
        .sort({ createdAt: req.query.sort || 1 })
        .populate("user", ["avatar", "username", "bio"]);
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { bio: req.body.bio },
        { new: true }
      ).select(["username", "avatar", "bio", "following", "followers"]);

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

  async follow(req, res) {
    try {
      await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $addToSet: {
            followers: req.user._id,
          },
        },
        {
          new: true,
        }
      );
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $addToSet: { following: req.params.id } },
        { new: true }
      );
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  }

  async unfollow(req, res) {
    if (req.user._id.toString() !== req.params.userId) {
      res.sendStatus(403);
      return;
    }
    try {
      await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $pull: {
            followers: req.user._id,
          },
        },
        {
          new: true,
        }
      );
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $pull: { following: req.params.id } },
        { new: true }
      );
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new Users();
