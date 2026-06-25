const bcrypt = require("bcrypt");
const user = require("../models/UserSchema");
const UserSchema = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route Handler

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      res.send(400).json({
        success: false,
        message: "Already Signedup email",
      });
    }
    // secure password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 15);
    } catch (err) {
      res.send(404).json({
        success: false,
        message: "Error during encryption",
      });
    }

    let user = await UserSchema.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "Data Entered in DB successfully",
    });
  } catch (error) {
    (console.log("Error During User Signup"),
      console.error(error),
      res.status(500).json({
        success: false,
        message: "Error aa gya hai ghar jao",
      }));
  }
};

// login route handler

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the details before Login",
      });
    }
    let AlreadyUser = await UserSchema.findOne({ email });
    if (!AlreadyUser) {
      return res.status(401).json({
        success: false,
        message: "No user Found Please Signup First Before Login",
      });
    }

    const payLoad = {
      email: AlreadyUser.email,
      id: AlreadyUser._id,
      role: AlreadyUser.role,
    };

    if (await bcrypt.compare(password, AlreadyUser.password)) {
      // jwt token creation and cookies handler

      let token = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      AlreadyUser = AlreadyUser.toObject();
      AlreadyUser.token = token;
      AlreadyUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure:true
      };

      res.cookie("PrependraCookie", token, options).status(200).json({
        success: true,
        token,
        AlreadyUser,
        message: "User Logined SuccessFully",
      });
    } else {
      return res.status(403).json({
        success: "false",
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Error in Login"
    })
  }
};
