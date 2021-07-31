import Axios from "axios";
import {BACKEND_URL} from "../config";

//Add data with random reading value for random times within a day for the selected sensor
export const autoAddData = async (sensor) => {
    console.log(`Sensor: ${sensor.sensor_name}`);
    const date = new Date().toJSON().substring(0, 10).replace('T', ' ');
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = Math.floor((Math.random() * 10)); minute < 60; minute += Math.floor((Math.random() * Math.floor((Math.random() * 60))) + 10)) {
            let second = Math.floor((Math.random() * 60));
            let time = hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ':'
                + minute.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                }) + ':'
                + second.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                });
            const value = Math.floor((Math.random() * sensor.sensor_threshold) + 10);
            const dateTime = `${date} ${time}`;
            console.log(`Value: ${value}\nDateTime: ${dateTime}`);
            await Axios.post(BACKEND_URL + "/sensors/data",
                {
                    sensor_id: sensor._id,
                    values: value,
                    date_time: dateTime
                }).then((res) => {
                console.log(res.data, sensor.sensor_name, value, dateTime)
            }).catch((err) => {
                console.log(err, sensor.name);
            })
        }
    }
}
