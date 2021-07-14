import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Header from "./Header";
import jwtDecode from "jwt-decode";
import Axios from "axios";
import {Trash2} from "react-feather";
import SensorItem from "./SensorItem";

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
                                    <SensorItem sensor={sensor} key={sensor._id}/>
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