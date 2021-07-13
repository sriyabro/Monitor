import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {Col} from "react-bootstrap";

const Chart = ({sensor}) => {

    const [sensorValues, setSensorValues] = useState([]);
    const [sensorTimes, setSensorTimes] = useState([]);
    const [selectedSensorLabel, setSelectedSensorLabel] = useState(null);

    useEffect(() => {
        const sensor_times = []; //labels
        const sensor_values = []; //data
       sensor?.sensor_readings.forEach((reading) => {
           sensor_times.push(reading.date_time.split(' ')[1].split(':')[0]);
           sensor_values.push(parseFloat(reading.values.toString()));
       });
       setSelectedSensorLabel(!sensor ? "No Sensor Selected" : sensor.sensor_name);
       setSensorTimes(sensor_times);
       setSensorValues(sensor_values);
   }, [sensor]);

    // const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

    const data = {
        labels: sensorTimes,
        datasets: [
            {
                label: selectedSensorLabel,
                data: sensorValues,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                // borderColor: ctx => {
                //     down(ctx, 'rgb(0,75,75)');
                // }
            }
        ]
    };

    const options = {
        scales: {
            y: {
                title : {
                  display: true,
                  text: "C"
                },
                beginAtZero : true
            }
        }
    };

    return (
        <React.Fragment>
            <Col xs={12} className="pt-0 chart">
                <Line data={data} options={options}/>
            </Col>
        </React.Fragment>
    );
}

export default Chart;