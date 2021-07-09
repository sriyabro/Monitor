const nodemailer = require('nodemailer');
const Vonage = require('@vonage/server-sdk');
require('dotenv').config();

const admin_email = process.env.EMAIL;
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
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

module.exports = {admin_email, monitor_app, transporter, vonage}