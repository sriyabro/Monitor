const config = require('../config/config');

const alertUser = (sensor, value) => {

    let user_email = sensor.sensor_user.user_Email;
    let user_tp = sensor.sensor_user.user_Contact;
    let notificationMethod = sensor.sensor_user.notification;
    let message = `Reading of ${sensor.sensor_name} : ${value} is over the threshold (${sensor.sensor_threshold}). Please login to Monitor and check the sensors`;

    if (notificationMethod === "EMAIL") {
        //send email alert with nodemailer
        let mailOptions = {
            from: {
                name: config.monitor_app,
                address: config.admin_email
            },
            to: user_email,
            subject: 'Sensor Alert',
            text: message
        };

        config.transporter.sendMail(mailOptions)
            .then(result => {
                console.log("Alert Email Sent to :", result.accepted[0]);
            })
            .catch(error => {
                console.log("Error Email !!!", error);
            });

    }

    if (notificationMethod === "SMS") {
        //send SMS alert with vonage
        config.vonage.message.sendSms(config.monitor_app, user_tp, message, (err, responseData) => {
            if (err) {
                console.log("Error SMS !!! ", err);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Alert Message Sent to :", user_tp);
                } else {
                    console.log(`Text Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        });
    }

    if (notificationMethod === "VOICE") {
        console.log("Voice Alert Sent to :", user_tp);
    }

};

module.exports = alertUser;