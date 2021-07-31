import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Header from "./Header";
import jwtDecode from "jwt-decode";
import Axios from "axios";
import Sensor from "./Sensor";
import {BarChart2, ChevronLeft} from "react-feather";
import {useHistory} from "react-router-dom";
import {BACKEND_URL} from "../config";
import Select from "react-select";
import Swal from "sweetalert2";
import {autoAddData} from "../controllers/autoData";
import {notificationOptions, notificationSelectStyles} from "../constants/constants";

const UserProfile = () => {
    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [addDataDisabled, setAddDataDisabled] = useState(false);


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getUserSensors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleted])

    const handleBackButtonClicked = () => {
        history.push('/')
    }

    const handleNotificationChange = (option) => {
        let selectedOption = option;
        if (option) {
            Swal.fire({
                title: 'Update Notification Method',
                text: `Set Notification Method to ${selectedOption.label}?`,
                icon: 'question',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        Axios.post(
                            BACKEND_URL + "/users/" + user._id,
                            {notification: selectedOption}
                        ).then((res) => {
                            getUserDetails().then(() => {
                                Swal.fire(
                                    'Done!',
                                    res.data,
                                    'success'
                                );
                            });
                        })
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
        }
    }

    const handleAddData = () => {
        Swal.fire({
            title: 'Add Data',
            text: `Add data with random reading value to all sensors in user account every 3 seconds for 5 mins or until the application is refreshed`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Start'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    if (sensors.length !== 0) {
                        setAddDataDisabled(true);
                        autoAddData(sensors);
                    } else {
                        Swal.fire({
                            title: 'No Sensors to add data',
                            icon: 'error'
                        })
                        console.log("No sensors to add data");
                    }
                }
            })
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

                    <h5 className="px-1 pt-5">Select Notification Method: </h5>
                    <Select className="ml-3"
                            options={notificationOptions}
                            styles={notificationSelectStyles}
                            onChange={handleNotificationChange}
                            value={notificationOptions?.filter(option => option.value === user?.notification)}
                    />
                    <Button className="auto-data mb-3" variant="outline-dark" disabled={addDataDisabled}
                            onClick={handleAddData}>
                        Add Data
                    </Button>
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