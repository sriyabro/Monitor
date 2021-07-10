import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {Col} from "react-bootstrap";

const Chart = ({sensor}) => {
    const sensor_times = []; //labels
    const sensor_values = []; //data
    const [selectedSensorLabel, setSelectedSensorLabel] = useState({label: "No Sensor Selected"});



    console.log("sensor in chart",sensor);
   // useEffect(() => {
   //     sensor.sensor_readings.map((reading) => {
   //         sensor_times.push(reading.date_time);
   //         sensor_values.push(reading.values);
   //     });
   // }, [sensor]);

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: selectedSensorLabel,
                data: [250, 150, 55, 1, 223, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    return (
        <React.Fragment>
            <Col xs={12} className="pt-3 chart">
                <Line data={data}/>
            </Col>
        </React.Fragment>
    );
}

export default Chart;