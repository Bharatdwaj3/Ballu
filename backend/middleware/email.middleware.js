const crypto=require('crypto');
const User =require('../models/user.model');
const {sendEmail}=require('../utils/email.util');
const { OTP_EXPIRES_MINUTES } = require('../config/env.config');

const generateOTP=()=>crypto.randomInt(100000, 999999).toString();

const sendVerificationEmail=async(user)=>{
    const token=generateOTP();
    const expires=Date.noew()+OTP_EXPIRES_MINUTES*60*1000;

    await User.findByIdAndUpdate(user._id,{
        emailVerificationToken: token,
        emailVerificationExpires: expires,
    });
    
    const html=`
    <h2>Email verification!!</h2>
    <p><strong>${user.fullName}</strong></p>
    <h1>${token}</h1>
    <p>Expires in ${OTP_EXPIRES_MINUTES} minutes.</p>
    `;

    return await sendEmail(user.email, 'Verify Your email',html);
}

const verifyOTP=async(userId, token)=>{
    const user=await User.findOne({
        _id: userId,
        emailVerificationToken: token,
        emailVerificationExpires: {$gt: Date.now()},
    });
    if(!user) return {success: false, message: 'Invalid or expired OTP'};
    await User.findByIdAndUpdate(userId, {
        isEmailVerfied: true,
        $unset: {emailVerificationToken:1, emailVerificationExpires:1},
    });
    return {success: true, message: 'Email verified'};
};

module.exports={sendVerificationEmail, verifyOTP};