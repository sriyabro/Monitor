import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Header from "./Header";
import jwtDecode from "jwt-decode";
import Axios from "axios";
import {Trash2} from "react-feather";

const UserProfile = () => {
    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;

    const [user, setUser] = useState(null);
    const [sensors, setSensors] = useState([]);

    const getUserDetails = async () => {
        try {
            const user = await Axios.get(
                "http://localhost:6500/users/" + userID
            );
            setUser(user.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getUserSensors = async () => {
        try {
            const sensors = await Axios.get(
                "http://localhost:6500/sensors/user/" + userID
            );
            setSensors(sensors.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserDetails();
        getUserSensors();
    }, [])

    console.log(sensors);
    console.log(user);

    return (
        <React.Fragment>
            <Header/>
            <Row className="user-profile p-3">
                <Col xs={12} md={6}>
                    <h2 className="mb-3">User Profile</h2>
                    <h5 className="p-1">Username: <span className="text-dark">{user?.user_Name}</span></h5>
                    <h5 className="p-1">Email: <span className="text-dark">{user?.user_Email}</span></h5>
                    <h5 className="p-1">Contact No.: <span className="text-dark">{user?.user_Contact}</span></h5>
                </Col>
                <Col xs={12} md={6}>
                    <h4>Sensors : </h4>
                    <Row className="sensor-list">
                        <Col xs={12}>
                            {sensors.map((sensor) => {
                                return (
                                    <Row key={sensor._id} className="sensor my-2 py-2">
                                        <Col xs={6}>
                                            <h5>{sensor.sensor_name}</h5>
                                            <p className="m-0">
                                                Threshold Value: <span
                                                className="text-danger">{sensor.sensor_threshold}</span>
                                            </p>
                                        </Col>
                                        <Col xs={5}>
                                    <span>last reading updated on:
                                        <p className="m-0">
                                            {sensor.sensor_readings.length === 0
                                                ? "No past readings"
                                                : sensor.sensor_readings[sensor.sensor_readings.length - 1].date_time
                                            }
                                        </p>
                                    </span>
                                        </Col>
                                        <Col xs={1} className="delete-col text-danger">
                                            <Trash2 className="delete" size={20}/>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default UserProfile;