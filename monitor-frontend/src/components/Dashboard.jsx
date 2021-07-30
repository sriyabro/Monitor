import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import {Button, Col, Row} from "react-bootstrap";
import {Activity, Plus} from 'react-feather';
import {BACKEND_URL, sensorSelectStyles} from "../constants/constants";
import Header from "./Header";
import Chart from "./Chart";
import AddSensor from "./AddSensor";
import jwtDecode from "jwt-decode";
import Axios from 'axios';

const Dashboard = () => {
        const [selectorOptions, setSelectorOptions] = useState(null);
        const [showAddSensorModal, setShowAddSensorModal] = useState(false);
        const [selectedSensor, setSelectedSensor] = useState(null);
        const [sensors, setSensors] = useState([]);

    const history = useHistory();
        const jwt = localStorage.getItem("token");
        let userID = jwtDecode(jwt)._id;

        const getSensors = async () => {

            try {
              const data = await Axios.get(
                BACKEND_URL + "/sensors/user/" + userID
              );
              setSensors(data.data);

            } catch (e) {
              console.log(e);
            }
          };

        useEffect(() => {
            getSensors();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

    useEffect(() => {
        if (!sensors) {
            return;
        }
        let options = [];
        sensors.forEach((sensor) => {
            options?.push({
                label: sensor.sensor_name,
                value: sensor._id
            })
        })
        if (!options) return;
        setSelectorOptions(options);
    }, [sensors]);

    const handleSensorChange = (option) => {
        if (option) {
            sensors.forEach((sensor) => {
                if (option.value === sensor._id) {
                    setSelectedSensor(sensor);
                    localStorage.setItem("selectedSensorId", sensor._id);
                }
            });
        }
    }

    const handleAddSensorBtnClick = () => {
        setShowAddSensorModal(true);
    }

    const handleAddSensorModalClose = () => {
        setShowAddSensorModal(false);
    }

    const handleAddNewSensor = () => {
       getSensors();
    }

    const handleAlertHistoryButton = () => {
        history.push('/alert-history');
    }

    return (
        <React.Fragment>
            <Header/>
        <AddSensor showModal={showAddSensorModal}
                   handleClose={handleAddSensorModalClose}
                   handleAddNewSensor={handleAddNewSensor}
        />
        <Row className="sensors px-3 pt-3" >
            <Col xs={12} lg={6} className="">
                { !selectedSensor ?
                    <h4>Please Select a Sensor</h4>
                    :
                    <>
                    <span className="sensor-name">{selectedSensor.sensor_name}</span><br/>
                    {selectedSensor.sensor_readings.length === 0 ? "No past readings" :
                    <>
                    <span className="current-value pl-2">
                        {selectedSensor.sensor_readings[selectedSensor.sensor_readings.length - 1].values}
                        &nbsp; &deg;C &nbsp;
                    </span>
                        <span>
                            at &nbsp; {selectedSensor.sensor_readings[selectedSensor.sensor_readings.length - 1].date_time}
                        </span>
                    </>
                    }</>
                }
            </Col>
            <Col xs={12} lg={6}>
                <Row className="justify-content-end pb-2">
                    <Col xs={12} lg="7">
                        <Select className="select-control" classNamePrefix="select-control"
                                isSearchable
                                noOptionsMessage={() => ("No Sensors Found, Please Create a New Sensor")}
                                options={!selectorOptions ? [] : selectorOptions}
                                styles={sensorSelectStyles}
                                onChange={handleSensorChange}
                                value={selectorOptions?.value}
                        />
                    </Col>
                    <Col xs={12} sm={5} lg="auto" className="pl-0 pr-1 float-right">
                        <Button className="new-sensor " onClick={handleAddSensorBtnClick}>
                            <Plus/> &nbsp; Add New Sensor
                        </Button>

                    </Col>
                </Row>
                <Row>
                    <Col xs={12}  className="text-right pr-1 pt-2">

                        {
                            selectedSensor === null ?
                                (
                                    <Button className="history text-dark border-dark" onClick={handleAlertHistoryButton} disabled>
                                        <Activity/> &nbsp; View Sensor Alert History
                                    </Button>
                                ):
                                (
                                    <Button className="history text-danger border-danger" onClick={handleAlertHistoryButton}>
                                        <Activity/> &nbsp; View Sensor Alert History
                                    </Button>
                                )
                        }
                    </Col>
                </Row>
            </Col>
            <Chart sensor={selectedSensor}/>
        </Row>
        </React.Fragment>
    )
}

export default Dashboard;