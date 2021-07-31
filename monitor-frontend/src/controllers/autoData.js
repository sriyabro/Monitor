import Axios from "axios";
import {BACKEND_URL} from "../config";

//Add data with random reading value to all sensors in user account every 3 seconds for 5 mins or until the application is refreshed
export const autoAddData = (sensors) => {
    const sendData = setInterval(() => {
        sensors.forEach((sensor) => {
            const dateTime = new Date().toJSON().substring(0, 19).replace('T', ' ');
            const value = Math.floor((Math.random() * 100) + 1);
            Axios.post(BACKEND_URL + "/sensors/data",
                {
                    sensor_id: sensor._id,
                    values: value,
                    date_time: dateTime
                }).then((res) => {
                console.log(res.data, sensor.sensor_name, value, dateTime)
            }).catch((err) => {
                console.log(err, sensor.name);
            })
        })
    }, 5000);

    setTimeout(() => {
        clearInterval(sendData);
    }, 300000) //5 mins
}
