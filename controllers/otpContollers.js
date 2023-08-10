const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel')
const User = require('../models/userModels.js')

exports.sendOTP =  async (req, res) => {
    try {
        const {email} = req.body
        // Check if user is already present 
        const checkUserPresent = await User.findOne({email})
        // If user found with provided email
        if(checkUserPresent) {
            return res.status(401).json({
                sucess: false,
                message: 'User is already exists'
            })
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        let result = await OTP.findOne({ otp: otp})
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false
            })
            result = await OTP.findOne({ otp: otp})
        }
        const otpPayload = { email, otp}
        const otpBody = await OTP.create(otpPayload)
        res.status(200).json({
            sucess: true,
            message: 'OTP code sent successfully',
            otpBody
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            sucess: false,
            error: error.message
        })
    }
}