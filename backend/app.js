require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var cors = require("cors");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// unauthorised error handling in protected route
app.use(function (error, req, res, next) {
  if (error.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

// Mongodb connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Require Routes
const authRoutes = require("./routes/auth");

// Routes
app.use("/", authRoutes);

// Port Connection

const port = 4000;
app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
