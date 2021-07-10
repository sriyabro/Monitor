import React, {useState} from 'react'
import {Alert, Button, Col, FormControl, Modal, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";
import Select from "react-select";
import {AlertTriangle} from "react-feather";
import jwtDecode from "jwt-decode";
import Axios from 'axios';
import Swal from 'sweetalert2';

const unitOptions = [
    {label: 'C', value: 'C'},
    {label: 'F', value: 'F'},
    {label: 'm', value: 'm'},
    {label: 'Km/h', value: 'Km/h'},
]

const AddSensor = (props) => {

    const jwt = localStorage.getItem("token");
    let userID = jwtDecode(jwt)._id;

    const url = "http://localhost:6500/sensors/add";
    const [sensorName, setSensorName] = useState(null);
    const [sensorThreshold, setSensorThreshold] = useState(null);
    const [sensorUnit, setSensorUnit] = useState(null);
    const [formInvalid, setFormInvalid] = useState(false);

    const handleAddNewSensor = (e) => {
        e.preventDefault();
        if (!sensorName || !sensorThreshold || sensorName === '' || sensorThreshold === '' || !sensorUnit ) {
            setFormInvalid(true);
            return;
        }
        setFormInvalid(false);

        let newSensor = {
            sensor_user: userID,
            sensor_name: sensorName,
            sensor_threshold: sensorThreshold,
            //unit: sensorUnit
        }

        Axios.post(url,newSensor)
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
        .catch(()=> {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        })
        setSensorName(null);
        setSensorThreshold(null);
        setSensorUnit(null);
    }

    const handleSensorNameChange = (e) => setSensorName(e.target.value);

    const handleThresholdChange = (e) => setSensorThreshold(e.target.value);

    const handleSensorUnitChange = (option) => setSensorUnit(option.value);

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
                            &nbsp; Threshold Value
                            <NumberFormat className="form-control input-field"
                                          displayType={'input'}
                                          onChange={handleThresholdChange}
                                          required/>
                        </Col>
                        <Col xs={4} className="pt-2 pl-0">
                            &nbsp; Unit
                            <Select className="select-control" classNamePrefix="select-control"
                                    options={unitOptions}
                                    onChange={handleSensorUnitChange}
                                    value={unitOptions.value}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel text-danger border-danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="add-sensor text-primary border-primary" onClick={handleAddNewSensor}>Add Sensor</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSensor;