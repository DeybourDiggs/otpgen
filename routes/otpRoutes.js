const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpContollers");


router.post("/send-otp", otpController.sendOTP);

module.exports = router;
