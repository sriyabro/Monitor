import React, {useEffect, useState} from 'react'
import Select from 'react-select';
import {Line} from "react-chartjs-2";
import {Button, Col, Row} from "react-bootstrap";
import {Activity, Plus} from 'react-feather';
import {customStyles} from "../../constants/constants";


const sensors = [
    {name: 'Temp'},
    {name: 'Humidity'},
    {name: 'Water Level'}
]

function Chart() {
      const [selectorOptions, setSelectorOptions] = useState(null);
      const [selectedSensor, setSelectedSensor] = useState("No sensor selected");

    useEffect(() => {
        if (!sensors) {
            return;
        }
        let options = [];
        sensors.forEach((sensor) => {
            options?.push({
                label: sensor.name,
                value: sensor.name
            })
        })
        if (!options) return;
        setSelectorOptions(options);
    }, [sensors]);

    const handleSensorChange = (option) => {
        if (option)
            setSelectedSensor(option.label);
    }

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: selectedSensor,
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    return (
        <Row className="sensors p-3 mb-5" >
            <Col xs={12} md={4}>
                <Select className="select-control" classNamePrefix="select-control"
                        isSearchable
                        isClearable
                        noOptionsMessage={() => ("No Matching Sensors Found, Please Create New Sensor")}
                        options={!selectorOptions ? [] : selectorOptions}
                        styles={customStyles}
                        onChange={handleSensorChange}
                        value={selectorOptions?.value}
                />
            </Col>
            <Col xs={12} md={4} className="px-0">
                <Button className="new-sensor">
                    <Plus/> &nbsp; Add New Sensor
                </Button>

            </Col>
           <Col xs={12} md={4} className="text-right">
               <Button className="history text-danger border-danger">
                   <Activity/> &nbsp; View Sensor Alert History
               </Button>

           </Col>

            <Col xs={12} className="pt-5 chart">
                <Line data={data} />
            </Col>
        </Row>
    )
}

export default Chart;