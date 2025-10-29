const nodemailer=require("nodemailer");
const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM}=require('../config/env.config');

const transporter=nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_PORT === "465",
    auth: {user: SMTP_USER, pass: SMTP_PASS},
});

const sendEmail=async(toString, subject, html)=>{
    try{
        await transporter.sendMail({
            from: `YourApp <${EMAIL_FROM}>`,
            to,
            subject,
            html,
        });
        return true;
    }
    catch(err){
        console.error("Email failed:",err);
        return false;
    }
};

module.exports={sendEmail};