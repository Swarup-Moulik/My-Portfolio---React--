import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    //Validating email and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please provide proper email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please provide stronger password",
      });
    }
    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //New User
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//Login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Check if user already exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists",
      });
    }
    //Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//Export the functions
export { registerUser, loginUser };
