const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { cookieName, secret } = require("../config/env/index");

async function auth(req, res, next) {
  const token = req.cookies[cookieName];
  if (!token) {
    res.sendStatus(403);
    return;
  }

  try {
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
    return;
  }
}

module.exports = auth;
