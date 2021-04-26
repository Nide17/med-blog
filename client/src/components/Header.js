import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Form, FormGroup, Input, NavbarText, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import logo from '../images/quizLogo.svg'
import { connect } from 'react-redux';

const Header = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { isAuthenticated, user } = props.auth;

    const authLinks = (
        <>
            <NavbarText className="mx-0 text-warning">
                <span>
                    <Link to="/webmaster">
                    <small className="text-warning">
                        {user ? `Account (${user.name.split(" ").splice(-1)})` : ''}
                        </small>
                    </Link>
                </span>
            </NavbarText>

            <NavbarText className="logout ml-3">
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

    return (
        <header style={{ boxShadow: "0 2px 10px -1px rgba(0,0,0,0.75)" }}>

            <Navbar color="primary" light expand="lg" className="px-lg-5 py-md-3">
                <NavbarBrand href="/" className="text-white" style={{ fontWeight: "900" }}>
                    <img src={logo} alt="logo" />
                </NavbarBrand>

                {
                    isOpen ?
                        <Button close onClick={toggle} className="px-3 mr-1 text-danger d-lg-none" /> :
                        <NavbarToggler onClick={toggle} />
                }

                <Collapse isOpen={isOpen} navbar>

                    <Nav className="mr-auto" navbar>

                        <Form className="ml-lg-5 py-2">
                            <FormGroup className="my-auto">
                                <Input type="search" name="search" placeholder="Search ..." bsSize="sm" className="py-0" style={{ width: "250px" }} />
                            </FormGroup>
                        </Form>
                    </Nav>

                    <NavbarText className="mr-3">
                        <Link to="/about" className="text-white">About</Link>
                    </NavbarText>
                    <NavbarText className="mr-3">
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
