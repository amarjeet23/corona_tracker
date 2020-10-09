const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");
var cookieParser = require("cookie-parser");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  if (!name || !email || !password) {
    return res.status(422).json({
      error: "please add all field",
    });
  }
  User.findOne({ email })
    .then((saveduser) => {
      if (saveduser) {
        return res.status(422).json({ error: "email already registered" });
      }
      const user = new User({
        name,
        email,
        password,
      });
      user
        .save()
        .then((user) => {
          return res.json({ msg: "saved successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.json({ error: "*All fields are required" });
  }
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({ error: "*Email is not registered" });
    }
    if (!user.authenticate(password)) {
      return res.json({ error: "*email and password do not match" });
    }

    // generate a token with usere id and secret
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // persist token as t in cookie with expiry date
    res.cookie("token", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, name, email, role } });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "signout success" });
};
// protected routes
exports.isSignedin = expressjwt({
  secret: process.env.SECRET,
  //sending user id to the req that's why we use userproperty like : _id
  userProperty: "auth",
});
