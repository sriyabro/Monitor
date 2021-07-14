import React from 'react'
import {Button, Col, Row} from "react-bootstrap";
import {LogOut, User} from 'react-feather';
import jwtDecode from "jwt-decode";
import {useHistory} from 'react-router-dom';

const Header = () => {

    const jwt = localStorage.getItem("token");
    let userName = jwtDecode(jwt).user_Name;
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    const handleUserClicked = () => {
        history.push('/profile');
    }

    return (
        <Row className="p-2 header">
            <Col xs={6}>
                <h1 className="logo my-0 pl-2">Monitor</h1>
            </Col>
            <Col xs={6} className="text-right">
                <span className="user mr-4 d-none d-md-inline" onClick={handleUserClicked}><User/> {userName}</span>
                <Button className="logout my-2 py-1 px-3" variant="outline-dark" onClick={handleLogout}>
                    Logout &nbsp;&nbsp; <LogOut size={18}/>
                </Button>
            </Col>
        </Row>
    );
}

export default Header;