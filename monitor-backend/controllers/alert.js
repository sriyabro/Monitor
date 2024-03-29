const config = require('../config/config');

const alertUser = (sensor, value) => {

    let user_email = sensor.sensor_user.user_Email;
    let user_tp = sensor.sensor_user.user_Contact;
    let notificationMethod = sensor.sensor_user.notification;
    let message = `Reading of ${sensor.sensor_name} is ${parseFloat(value) - parseFloat(sensor.sensor_threshold)}\u00B0C over the threshold (${sensor.sensor_threshold}\u00B0C). 
    \nCurrent reading value: ${value}\u00B0C\nPlease login to Monitor (https://monitor-b9f93.web.app/) for more details`;
    console.log(`Value: ${value}, Threshold:  ${sensor.sensor_threshold}`);


    //Send Email Notification
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

    //Send Text Notification
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

    //Send Voice Notification
    if (notificationMethod === "VOICE") {
        config.vonage.calls.create({
            to: [{
                type: 'phone',
                number: user_tp
            }],
            from: {
                type: 'phone',
                number: config.admin_number
            },
            ncco: [{
                "action": "talk",
                "text": message
            }]
        }, (error, response) => {
            if (error) console.error("Error sending Voice Alert",error)
            if (response) {
                console.log(`Voice Alert Sent to : ${user_tp}`, response);
            }
        })
    }
};

module.exports = alertUser;