const nodemailer = require('nodemailer');
const Vonage = require('@vonage/server-sdk');
require('dotenv').config();
const vonagePrivateKey = `${__dirname}/${process.env.VONAGE_PRIVATE_KEY}`;

const admin_email = process.env.EMAIL;
const admin_number = process.env.NUMBER;
const monitor_app = "Monitor App";

//nodemailer config
const transporter = nodemailer.createTransport({
    host: 'smtp.memail.com',
    port: 587,
    secure: false,
    auth: {
        user: admin_email,
        pass: process.env.PASSWORD
    }
});

//vonage config
const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    applicationId: process.env.VONAGE_APPLICATION_ID,
    privateKey: vonagePrivateKey
});

module.exports = {admin_email, admin_number, monitor_app, transporter, vonage}