import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Header from "./Header";
import jwtDecode from "jwt-decode";
import Axios from "axios";
import Sensor from "./Sensor";
import {BarChart2, ChevronLeft} from "react-feather";
import {useHistory} from "react-router-dom";
import {BACKEND_URL} from "../constants/constants";

const UserProfile = () => {
    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const handleDeleted = (state) => {
        setDeleted(state);
    }

    const getUserDetails = async () => {
        try {
            const user = await Axios.get(
                BACKEND_URL + "/users/" + userID
            );
            setUser(user.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getUserSensors = async () => {
        try {
            const sensors = await Axios.get(
                BACKEND_URL + "/sensors/user/" + userID
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

    useEffect(() => {
        getUserSensors();
    }, [deleted])

    const handleBackButtonClicked = () => {
        history.push('/dashboard')
    }

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
                    <Row>
                        <Col xs={12} className="text-right px-1">
                            <Button className="back text-danger border-danger" onClick={handleBackButtonClicked}>
                                <ChevronLeft/> &nbsp; Back to Dashboard &nbsp; <BarChart2/>
                            </Button>
                        </Col>
                        <Col xs={12}>
                            <h3 className="m-0 pt-2">Sensors : </h3>
                        </Col>
                    </Row>
                    <Row className="sensor-list">
                        <Col xs={12}>
                            {sensors.map((sensor) => {
                                return (
                                    <Sensor sensor={sensor} deleted={handleDeleted} key={sensor._id}/>
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