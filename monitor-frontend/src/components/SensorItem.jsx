import React from "react";
import {Col, Row} from "react-bootstrap";
import {Trash2} from "react-feather";

const SensorItem = ({sensor}) => {
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
                <Trash2 className="delete" size={20}/>
            </Col>
        </Row>
    );
}

export default SensorItem;