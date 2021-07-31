import React from "react";
import {Col, Row} from "react-bootstrap";
import {Trash2} from "react-feather";
import Axios from "axios";
import Swal from "sweetalert2";
import {BACKEND_URL} from "../config";

const Sensor = ({sensor, deleted}) => {

    const handleDeleteSensor = () => {
        deleted(false);
        Swal.fire({
            title: 'Delete Sensor',
            text: `Are you sure you want to delete ${sensor.sensor_name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    Axios.delete(
                        BACKEND_URL + "/sensors/" + sensor._id
                    ).then(() => {
                        deleted(true);
                        Swal.fire(
                            'Deleted!',
                            `Sensor deleted successfully!`,
                            'success'
                        )
                    })
                } catch (err) {
                    console.log(err);
                }
            }
        })
    };

    return (
        <Row className="sensor my-2 py-2">
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
                <Trash2 className="delete" size={20} onClick={handleDeleteSensor}/>
            </Col>
        </Row>
    );
}

export default Sensor;