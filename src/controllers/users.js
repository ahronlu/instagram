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

  async editUser(req, res) {
    const id = req.params.id;
    const queryOptions = {
      upsert: true,
      omitUndefined: true,
      new: true,
    };
    let updatedValues = {
      fullName: req.body.fullName,
      bio: req.body.bio,
    };

    if (!id && !updatedValues) {
      res.sendStatus(400);
      return;
    }
    if (req.user._id != id) {
      res.sendStatus(403);
      return;
    }
    if (req.body.avatar) {
      const base64Data = req.body.avatar.split(";base64,").pop();
      const avatarName = makeUniqueImageName();
      updatedValues.avatar = avatarName;
      fs.writeFile(
        "public/avatars/" + avatarName,
        base64Data,
        "base64",
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    try {
      let updatedUser = await User.findByIdAndUpdate(
        id,
        updatedValues,
        queryOptions
      ).select(["_id", "fullName", "username", "bio", "avatar", "createdAt"]);
      if (!updatedUser) {
        res.sendStatus(401);
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async update(req, res) {
    try {
      const user = User.findOneAndUpdate(
        { _id: req.params.id },
        {
          bio: req.body.bio,
        },
        {
          new: true,
        }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new Users();
