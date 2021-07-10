import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import {Button, Col, Row} from "react-bootstrap";
import {Activity, Plus} from 'react-feather';
import {customStyles} from "../constants/constants";
import Header from "./Header";
import Chart from "./Chart";
import AddSensor from "./AddSensor";
import jwtDecode from "jwt-decode";
import Axios from 'axios';

const Dashboard = () => {
        const [selectorOptions, setSelectorOptions] = useState(null);
        const [selectedSensor, setSelectedSensor] = useState({label: "No Sensor Selected"});
        const [showAddSensorModal, setShowAddSensorModal] = useState(false);
        const [sensors, setSensors] = useState([]);
        const history = useHistory();
        const jwt = localStorage.getItem("token");
        let userID = jwtDecode(jwt)._id;

        const getSensors = async () => {

            try {
              const data = await Axios.get(
                "http://localhost:6500/sensors/" + userID
              );
              setSensors(data.data);
     
            } catch (e) {
              console.log(e);
            }
          };

        useEffect(() => {
            getSensors();
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

            console.log(sensor);
        })
        if (!options) return;
        setSelectorOptions(options);
    }, [sensors]);

    const handleSensorChange = (option) => {
        if (option)
            setSelectedSensor(option);
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
        <Row className="sensors p-3 mb-5" >
            <Col xs={12} lg={4}>
                <Select className="select-control" classNamePrefix="select-control"
                        isSearchable
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
            <Chart sensor={selectedSensor}/>
        </Row>
        </React.Fragment>
    )
}

export default Dashboard;