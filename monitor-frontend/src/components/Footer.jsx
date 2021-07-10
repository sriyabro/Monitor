import React from 'react'
import {Col, Row} from "react-bootstrap"
import {GitHub} from "react-feather";

function Footer () {
    return(
        <Row className="footer py-2">
            <Col xs={12} className="">
                <span>L3 SEM 1 - INTE 31273 - Integrative Programming and Technologies | Assignment 2 (Group Project)</span>
                <a href="https://github.com/sriyabro/Monitor" rel="noreferrer" target="_blank" className="float-right git">Github &nbsp;<GitHub/></a>
            </Col>
        </Row>
    );
}

export default Footer;