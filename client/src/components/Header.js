import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Form, FormGroup, Input, NavbarText } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";
import logo from '../images/Logo Med-Blog.svg'
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout  from './auth/Logout';

const Header = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { isAuthenticated, user } = props.auth;

    const authLinks = (
        <>
            <NavbarText className="mx-0 text-warning">
                <span>
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </span>
            </NavbarText>

            <NavbarText className="mx-0">
                <Logout />
            </NavbarText>
        </>
    )

    const guestLinks = (
        <>
            <NavbarText className="mx-0">
                <LoginModal />
            </NavbarText>

            <NavbarText className="mx-0">
                <RegisterModal />
            </NavbarText>
        </>
    )

    // React Router 5.1 there is the hook useLocation, which lets you easily access the current location.
    let location = useLocation();

    const blinkBtn = (location.pathname === '/questions' || location.pathname === '/create') ? '' :
        <>
            <Link to="/questions" className="text-white blink_me mt-1 mr-2">Quiz</Link>
            {isAuthenticated ? <Link to="/create" className="text-warning ml-2 mt-1">Create Quiz</Link> : null}
        </>

    return (
        <header style={{ boxShadow: "0 2px 10px -1px rgba(0,0,0,0.75)" }}>
            <Navbar color="primary" light expand="md" className="px-md-5 py-md-3">
                <NavbarBrand href="/" className="text-white" style={{ fontWeight: "900" }}>
                    <img src={logo} alt="logo" />
                </NavbarBrand>

                <NavbarText className="mr-4 d-md-none">
                    {blinkBtn}
                </NavbarText>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>

                    <Nav className="mr-auto" navbar>

                        <Form className="ml-md-5 py-2">
                            <FormGroup className="my-auto">
                                <Input type="search" name="search" placeholder="Search ..." bsSize="sm" className="py-0" style={{ width: "250px" }} />
                            </FormGroup>
                        </Form>
                    </Nav>

                    <NavbarText className="mr-4 d-none d-sm-flex">
                        {blinkBtn}
                    </NavbarText>
                    <NavbarText className="mr-4">
                        <Link to="/about" className="text-white">About</Link>
                    </NavbarText>
                    <NavbarText className="mr-4">
                        <Link to="/contact" className="text-white">Contact</Link>
                    </NavbarText>
                    {isAuthenticated ? authLinks : guestLinks}
                </Collapse>

            </Navbar>
        </header>
    )
}

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.authReducer,
})
export default connect(mapStateToProps, null)(Header)
