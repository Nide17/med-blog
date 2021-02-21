import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Form, FormGroup, Input, NavbarText } from 'reactstrap';
import { Link, useLocation } from "react-router-dom";
import logo from '../images/Logo Med-Blog.svg'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // React Router 5.1 there is the hook useLocation, which lets you easily access the current location.
    let location = useLocation();

    const blinkBtn = location.pathname === '/quiz' ? '' :

        <Link to="/quiz" className="text-white blink_me">Quiz</Link>

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

                    </Collapse>

                </Navbar>
            </header>
        )
    }
    
export default Header
