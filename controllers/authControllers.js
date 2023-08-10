const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const OTP = require("../models/otpModel");

const signUp = async (req, res) => {
  try {
    const { name, email, password, role, otp } = req.body;
    // Check if all details are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        messsage: "All fields are required",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // find the most recent OTP for email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    }

    // secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Hashing password error for ${password}: ` + error.message
        })
    }

    // register user
    const newUser = await User.create({
        name,
        email,
        password : hashedPassword,
        role
    })
    return res.status(201).json({
        success: true,
        message:' User created Sucessfully',
        user: newUser
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
        success: false,
        error: error.message
    })
  }
};

module.exports = {signUp}

