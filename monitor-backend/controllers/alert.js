const config = require('../config/config');

const alertUser = (sensor, value) => {

    let user_email = sensor.sensor_user.user_Email;
    let user_tp = sensor.sensor_user.user_Contact;
    let message = "Reading of sensor " + sensor.sensor_name + " : " + value +
        " is over the threshold, Please login to Monitor and check the sensors";


    //send email with nodemailer
    let mailOptions = {
        from: {
            name: config.monitor_app,
            address: config.admin_email
        },
        to: user_email,
        subject: 'Monitor Alert',
        text: message
    };

    config.transporter.sendMail(mailOptions)
        .then(result => {
            console.log("Email Sent !!! : ", result);
        })
        .catch(error => {
            console.log("Error Email !!!", error);
        });

    config.vonage.message.sendSms(config.monitor_app, user_tp, message, (err, responseData) => {
        if (err) {
            console.log("Error SMS !!! ", err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully. : ", user_tp);
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    });
};

module.exports = alertUser;