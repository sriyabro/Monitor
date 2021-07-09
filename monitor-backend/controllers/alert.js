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

    let user_email = sensor.sensor_user.user_Email;
    let user_tp = sensor.sensor_user.user_Contact;
    let message = "Reading of sensor " + sensor.sensor_name + " : " + value +
        " is over the threshold, Please login to Monitor and check the sensors";

    //send email with nodemailer
    let mailOptions = {
        from: {
            name: 'Monitor App',
            address: process.env.EMAIL
        },
        to: user_email,
        subject: 'Monitor Alert',
        text: message
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