import React from 'react'
import {Button, Col, Row} from "react-bootstrap";
import {LogOut, User} from 'react-feather';

function Header() {
    return (
        <Row className="p-3 header">
            <Col xs={6} >
                <h1 className="logo">Monitor</h1>
            </Col>
            <Col xs={6} className="text-right">
                <span className="mr-4 d-none d-md-inline user"><User/> Mark</span>
                <Button className="logout my-2 py-1 px-3" variant="outline-dark">Logout &nbsp;&nbsp; <LogOut size={18}/></Button>
            </Col>
        </Row>
    );
}

export default Header