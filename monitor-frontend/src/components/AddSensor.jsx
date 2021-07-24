import React, {useState} from 'react'
import {Alert, Button, Col, FormControl, Modal, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";
import {AlertTriangle} from "react-feather";
import jwtDecode from "jwt-decode";
import Axios from 'axios';
import Swal from 'sweetalert2';
import {BACKEND_URL} from "../constants/constants";

const AddSensor = (props) => {

    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;

    const url = BACKEND_URL + "/sensors/add";
    const [sensorName, setSensorName] = useState(null);
    const [sensorThreshold, setSensorThreshold] = useState(null);
    //const [sensorUnit, setSensorUnit] = useState(null);
    const [formInvalid, setFormInvalid] = useState(false);

    const handleAddNewSensor = (e) => {
        e.preventDefault();
        if (!sensorName || !sensorThreshold || sensorName === '' || sensorThreshold === '') {
            setFormInvalid(true);
            return;
        }
        setFormInvalid(false);

        let newSensor = {
            sensor_user: userID,
            sensor_name: sensorName,
            sensor_threshold: sensorThreshold,
        }

        Axios.post(url, newSensor)
            .then(res => {
                console.log(res.data)
                if (res.data === "Sensor Added!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sensor Added!',
                    })
                    props.handleAddNewSensor();
                    handleClose();
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
        setSensorName(null);
        setSensorThreshold(null);
    }

    const handleSensorNameChange = (e) => setSensorName(e.target.value);

    const handleThresholdChange = (e) => setSensorThreshold(e.target.value);

    const handleClose = () => {
        props.handleClose();
        setFormInvalid(false);
    }

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="pl-3">Add New Sensor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {formInvalid && <Col xs={12}>
                            <Alert variant="danger" className="py-1 text-center">
                                <AlertTriangle size={20}/> &nbsp; Please fill the required fields
                            </Alert>
                        </Col>}
                        <Col xs={12}>
                            &nbsp; Sensor Name
                            <FormControl type="text"
                                         autoFocus
                                         onChange={handleSensorNameChange}
                                         required/>
                        </Col>
                        <Col xs={8} className="pt-2">
                            &nbsp; Threshold Value ( &deg;C )
                            <NumberFormat className="form-control input-field"
                                          displayType={'input'}
                                          onChange={handleThresholdChange}
                                          required/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel text-danger border-danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="add-sensor text-primary border-primary" onClick={handleAddNewSensor}>Add
                        Sensor</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSensor;