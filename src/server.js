const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/env/index");
const routes = require("./config/routes");
const app = express();
const port = config.port;

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(routes);

connect();

function listen() {
  app.listen(port, () => console.log(`Server is running on port ${port}!`));
}

function connect() {
  mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on("error", (err) => console.log(err));
  db.on("open", listen);
}
