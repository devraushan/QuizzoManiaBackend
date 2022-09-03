const express = require("express");
const connectToMongo = require("../db");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { route } = require("express/lib/router");
const { findOne } = require("../Models/User");
const fetchuser = require("../middleware/fetchuser");

const Signature = "Ross";

router.use((req, res, next) => {
  connectToMongo();
  console.log("Time: ", Date.now());
  next();
});


//Route 1: for signup 
router.post(
  "/signup",
  //validation for entered data
  [
    body("email", "Enter a Valid Email").isEmail(),
    body(
      "password",
      "password too short. atleast 5 char should be there"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        let user = await User.findOne({ email: req.body.email });
        let userCheck = await User.findOne({ userName: req.body.userName });
        if (user) {
          //check if email is unique or not
          res.status(400).json({ error: "email already exists" });
        } else if (userCheck) {
          res.status(400).json({ error: "userName is already taken" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPass = await bcrypt.hash(req.body.password, salt);

          user = await User.create({
            displayName: req.body.displayName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPass,
          });
          const usrData = {
            user: {
              id: user.id,
            },
          };
          authToken = await jwt.sign(usrData, Signature);
          res.send({ authToken });
        }
      }
    } catch (error) {
      res.send("Some Error Occured");
    }
  }
);

//Route 2: for login
router.post(
  "/login",
  [
    //login validation
    body("email", "please enter a valid email").isEmail(),
    body("password", "password should not be void").isLength({min: 1}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
      } else {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
          res.status(400).json({ error: "bad credentials" });
        } else {
          const passCheck = await bcrypt.compare(password, user.password);
          if (!passCheck) {
            res.status(400).json({ error: "bad credentials" });
          } else {
            const usrData = {
              user: {
                id: user.id,
              },
            };
            authToken = await jwt.sign(usrData, Signature);
            res.send({ authToken });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3 : Fetch User data 
router.post("/fetchuser",fetchuser,async (req,res)=>{
  try {
    let userId = req.body.user.id;
    
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
})

module.exports = router;
 