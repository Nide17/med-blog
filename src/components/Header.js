import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Form, FormGroup, Input, NavbarText } from 'reactstrap';
import logo from '../images/Logo Med-Blog.svg'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div style={{ boxShadow: "0 2px 10px -1px rgba(0,0,0,0.75)" }}>
            <Navbar color="primary" light expand="md" className="px-md-5 py-md-3">
                <NavbarBrand href="/" className="text-white" style={{ fontWeight: "900" }}>
                    <img src={logo} alt="" srcset="" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>

                    <Nav className="mr-auto" navbar>

                        <Form className="ml-md-5 py-2">
                            <FormGroup className="my-auto">
                                <Input type="search" name="search" id="Search" placeholder="Search ..." bsSize="sm" className="py-0" style={{ width: "250px" }} />
                            </FormGroup>
                        </Form>

                    </Nav>

                    <NavbarText className="mr-4"><a href="#/" className="text-white">About</a></NavbarText>
                    <NavbarText className="mr-4"><a href="#/" className="text-white">Contact</a></NavbarText>

                </Collapse>

            </Navbar>
        </div>
    );
}

export default Header
