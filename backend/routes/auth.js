const express = require("express");
const router = express.Router();

// Controllers

const { signup, signin, signout } = require("../controllers/auth");

// express validator
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    // validation
    check("name","*name is required").isLength({ min: 1 }),
    check("email").isEmail().withMessage("*email is required"),
    check("password").isLength({min:5}).withMessage("*password must be atleast 5 character long")
  ],

  signup
);

router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
