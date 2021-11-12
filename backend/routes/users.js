const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

//get a list of all users
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

//get a list of specific user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res.status(500).json({ message: "The user with given ID was not found!" });
  }
  res.status(200).send(user);
});

//login method for user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECRET_KEY;

  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("Password is wrong");
  }

  return res.status(200).send(user);
});

//register user method -- need to be better
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    passwordHash,
    password2,
    street,
    apartment,
    city,
    zip,
    country,
    phone,
  } = req.body;
  let errors = [];

  //Validation conditions
  if (!name || !email || !passwordHash || !password2 || !phone) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (passwordHash !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (passwordHash.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    // send object { MSG: ERROR }
    res.status(400).send(errors);
  } else {
    // find if email is already exist in database
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registred" });
        res.status(400).send(errors);
      } else {
        let user = new User({
          name,
          email,
          passwordHash: bcrypt.hashSync(passwordHash, 10),
          street,
          apartment,
          city,
          zip,
          country,
          phone,
        });
        user.save();

        res.send(user);
      }
    });
  }
});

module.exports = router;
