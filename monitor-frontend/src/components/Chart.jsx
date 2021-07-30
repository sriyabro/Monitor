import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {Col} from "react-bootstrap";
import 'chartjs-adapter-luxon';

const Chart = ({sensor}) => {
    const [selectedSensorLabel, setSelectedSensorLabel] = useState(null);
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        const dataPairs = []; //data {x: time, y: value}
        sensor?.sensor_readings.forEach((reading) => {

            let date = new Date(reading.date_time);
            dataPairs.push(
                {
                    x: date.toLocaleTimeString(),
                    y: parseFloat(reading.values.toString())
                }
            );
        });
        setSelectedSensorLabel(!sensor ? "No Sensor Selected" : sensor.sensor_name);
        setDataArray(dataPairs);
    }, [sensor]);

    // const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

    const data = {
        datasets: [
            {
                label: selectedSensorLabel,
                data: dataArray,
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
            x: {
                type: 'time',
                // time: {
                //     unit: 'hour',
                // },
                // ticks: {
                //   callback: [0, 5, 10, 20]
                // },
                title: {
                    display: true,
                    text: "Hours"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "C"
                },
                beginAtZero: true
            }
        },
        maintainAspectRatio: false
    };

    return (
        <React.Fragment>
            <Col xs={12} className="pt-0 pl-0 chart">
                <Line data={data} options={options}/>
            </Col>
        </React.Fragment>
    );
}

export default Chart;