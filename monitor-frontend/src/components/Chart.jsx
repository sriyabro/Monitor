import React from "react";
import {Line} from "react-chartjs-2";
import {Col} from "react-bootstrap";

const Chart = ({sensor}) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: sensor.label,
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