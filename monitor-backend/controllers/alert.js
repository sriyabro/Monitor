const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: 'smtp.memail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const alertUser = (sensor, value) => {

    let mailOptions = {
        from: {
            name: 'Monitor App',
            address: process.env.EMAIL
        },
        to: sensor.sensor_user.user_Email,
        subject: 'Monitor Alert',
        text: sensor.sensor_name + " : " + value
    };

    transporter.sendMail(mailOptions)
        .then(result => {
            console.log("Email Sent !!! : ", result);
        })
        .catch(error => {
            console.log("Error Occurred !!!", error);
        });
};

module.exports = alertUser;