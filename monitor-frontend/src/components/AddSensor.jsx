import React from 'react'
import {Button, Col, FormControl, Modal, Row} from "react-bootstrap";


function AddSensor(props) {
    return (
        <>
            <Modal
                show={props.showModal}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Sensor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>Sensor Name : <FormControl></FormControl></Col>
                        <Col xs={12}></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel text-danger border-danger" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button className="add-sensor text-primary border-primary">Add Sensor</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddSensor;