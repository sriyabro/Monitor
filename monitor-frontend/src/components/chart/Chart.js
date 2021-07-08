import React from 'react'
import { Dropdown } from "react-bootstrap";

import { Line } from "react-chartjs-2";

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        }
    ]
};

function Chart() {

    return (

        <div class="shadow-lg p-3 mb-5 bg-white rounded" >
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Sensor
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Sensor 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Sensor 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Sensor 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br></br>

            <div >
                <Line data={data} />
            </div>

        </div>
    )
}

export default Chart