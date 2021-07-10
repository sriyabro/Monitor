import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import {Line} from "react-chartjs-2";
import {Button, Col, Row} from "react-bootstrap";
import {Activity, Plus} from 'react-feather';
import {customStyles} from "../constants/constants";
import AddSensor from "./AddSensor";
import Header from "./Header";

function Dashboard() {
        const [selectorOptions, setSelectorOptions] = useState(null);
        const [selectedSensor, setSelectedSensor] = useState("No sensor selected");
        const [showAddSensorModal, setShowAddSensorModal] = useState(false);

        const [sensors, setSensors] = useState([]);

    const history = useHistory();


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
            setSelectedSensor(option.value);
    }

    const handleAddSensorBtnClick = () => {
        setShowAddSensorModal(true);
    }

    const handleAddSensorModalClose = () => {
        setShowAddSensorModal(false);
    }

    const handleAddNewSensor = (newSensor) => {
        let sensorlist = sensors.slice();
        sensorlist.push({name: newSensor.name});
        setSensors(sensorlist);
        handleAddSensorModalClose();
    }

    const handleAlertHistoryButton = () => {
        history.push('/alert-history');
    }

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: selectedSensor,
                data: [100, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };


    return (
        <React.Fragment>
            <Header/>
        <AddSensor showModal={showAddSensorModal}
                   handleClose={handleAddSensorModalClose}
                   handleAddNewSensor={handleAddNewSensor}
        />
        <Row className="sensors p-3 mb-5" >
            <Col xs={12} lg={4}>
                <Select className="select-control" classNamePrefix="select-control"
                        isSearchable
                        isClearable
                        noOptionsMessage={() => ("No Sensors Found, Please Create a New Sensor")}
                        options={!selectorOptions ? [] : selectorOptions}
                        styles={customStyles}
                        onChange={handleSensorChange}
                        value={selectorOptions?.value}
                />
            </Col>
            <Col xs={12} sm={5} lg={4} className="px-0">
                <Button className="new-sensor" onClick={handleAddSensorBtnClick}>
                    <Plus/> &nbsp; Add New Sensor
                </Button>

            </Col>
           <Col xs={12} sm={7} lg={4} className="text-right">
               <Button className="history text-danger border-danger" onClick={handleAlertHistoryButton}>
                   <Activity/> &nbsp; View Sensor Alert History
               </Button>
           </Col>

            <Col xs={12} className="pt-3 chart">
                <Line data={data}/>
            </Col>
        </Row>
        </React.Fragment>
    )
}

export default Dashboard;