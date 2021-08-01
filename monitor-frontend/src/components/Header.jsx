import React from 'react'
import {Col, Image, Nav, NavDropdown, Row} from "react-bootstrap";
import {LogOut} from 'react-feather';
import jwtDecode from "jwt-decode";
import {useHistory} from 'react-router-dom';
import userAvatar from '../assets/images/profile.png';

const Header = () => {

    const jwt = localStorage.getItem("token");
    let userName = jwtDecode(jwt).user_Name;
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/login')
    }

    const handleUserClicked = () => {
        history.push('/profile');
    }

    return (
        <Row className="p-2 header">
            <Col xs={6}>
                <h1 className="logo my-0 pl-2 text" onClick={() => history.push('/')}>Monitor</h1>
            </Col>
            <Col xs={6}>
                <Nav className='m-0 p-0 justify-content-end'>
                    <NavDropdown className='profile'
                                 title={
                                     <Image className='avatar' src={userAvatar} roundedCircle/>
                                 }
                                 id="navbarScrollingDropdown" drop="left">
                        <NavDropdown.Item disabled
                                          className="text-dark font-weight-bold">{`Hi! ${userName}`}</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleUserClicked}>
                            Account
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item onClick={handleLogout}>Logout
                            <LogOut className="ml-3" size={16}/>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Col>
        </Row>
    );
}

export default Header;