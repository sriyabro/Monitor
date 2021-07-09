import React, {useEffect, useState} from 'react'
import Select from 'react-select';
import {Line} from "react-chartjs-2";
import {Col, Row} from "react-bootstrap";
import {Plus} from 'react-feather';

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

const sensors = [
    {
        name: 'Temp'
    },
    {
        name: 'Humidity'
    },
    {
        name: 'Water Level'
    }
]


function Chart() {
      const [selectorOptions, setSelectorOptions] = useState(null);


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

    return (
        <Row className="p-3 mb-5 bg-white rounded" >
            <Col xs={4}>
                <Select className="select-control" classNamePrefix="select-control"
                    isSearchable
                    isClearable
                    placeholder={null}
                    noOptionsMessage={() => ("No Matching Sensors Found, Please Create New Sensor")}
                    options={!selectorOptions ? [] : selectorOptions}
                    // onChange={handleSensorChange}
                    // value={selectorOptions?.filter(option => option.label === sensors?.name)}
                />
            </Col>
           <Col xs={8} className="text-right">
               <Plus/><span className="p-0"> Add New Sensor</span>
           </Col>

            <Col xs={12} >
                <Line data={data} />
            </Col>
        </Row>
    )
}

export default Chart