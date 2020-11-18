const express = require("express");
const multer = require("multer");
const users = require("../controllers/users");
const posts = require("../controllers/posts");
const auth = require("../middlewares/auth");
const comments = require("../controllers/comments");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/posts");
  },
  filename: function (req, file, cb) {
    const nameArr = file.originalname.split(".");
    const extension = nameArr[nameArr.length - 1];
    const filename = Math.random().toString(36).substr(2, 9);
    cb(null, filename + "." + extension);
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const routes = express.Router();

routes.get("/users", users.getAll);
routes.put("/users", users.create);
routes.get("/users/check", users.check);
routes.post("/users/login", users.login);
routes.get("/users/logout", users.logout);
routes.get("/users/me", auth, users.me);
routes.post("/users/:id", auth, upload.single("avatar"), users.editUser);
routes.get("/users/:id", users.getUser);
routes.get("/users/:id/posts", users.getPosts);
routes.post("/users/:id/follow", auth, users.follow);
routes.delete("/users/:id/unfollow/:userId", auth, users.unfollow);

routes.get("/posts", posts.getAll);
routes.get("/posts/:id", posts.getPost);
routes.put("/posts", auth, upload.single("image"), posts.create);
routes.delete("/posts/:id", auth, posts.delete);
routes.post("/posts/:id/likes", auth, posts.like);
routes.delete("/posts/:id/likes/:userId", auth, posts.unlike);

routes.put("/posts/:id/comment", auth, comments.create);
routes.get("/posts/:id/comment", auth, comments.get);
routes.delete("/comment/:id", auth, comments.delete);

routes.get("/health", (req, res) => {
  res.send("hi");
});

routes.post("/");

module.exports = routes;
