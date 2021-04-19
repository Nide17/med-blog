import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button, Col, Row, Form, FormGroup, Input, Alert } from 'reactstrap';
import { clearErrors } from '../redux/error/error.actions'
import { sendMsg } from '../redux/contacts/contacts.actions'

const Contact = ({ clearErrors, error, sendMsg }) => {

    const [state, setState] = useState({
        contact_name: '',
        email: '',
        message: ''
    })

    const onChangeHandler = e => {
        clearErrors();
        const { name, value } = e.target
        setState(state => ({ ...state, [name]: value }))
    };

    const onContact = e => {
        e.preventDefault();

        const { contact_name, email, message } = state;

        // Create user object
        const contactMsg = {
            contact_name,
            email,
            message
        };

        // Attempt to contact
        sendMsg(contactMsg);
    }

    return (
        <div>
            <Jumbotron className="m-md-5 py-0 text-center text-center">
                <h1 className="display-3 font-weight-bold">Let's connect!</h1>
                <p className="lead">
                    Med Blog is a web blog application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.
                </p>

                <hr className="my-2" />
                <p>Do you need further clarifications? Don't hesitate to contact us!</p>
            </Jumbotron>

            <Row className="mx-2 px-1 mx-md-5 px-md-5 contact d-md-flex justify-content-center">

                <Col sm="12">
                    <h3 className="display-4 text-center mb-md-3">Contact the authors</h3>
                </Col>

                <Col sm="6" className="mb-5">

                    {error.id === "ADD_CONTACT_FAIL" ?
                        <Alert color='danger'>
                            <small>{error.msg.msg}</small>
                        </Alert> :
                        null
                    }

                    <Form onSubmit={onContact}>
                        <FormGroup>
                            <Input type="text" name="contact_name" placeholder="Name" minLength="4" maxLength="30" onChange={onChangeHandler} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="email" name="email" placeholder="Email" onChange={onChangeHandler} required />
                        </FormGroup>

                        <FormGroup row>
                            <Col>
                                <Input type="textarea" name="message" placeholder="Message" minLength="10" maxLength="300" onChange={onChangeHandler} required />
                            </Col>
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>

                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.errorReducer
})

export default connect(mapStateToProps, { clearErrors, sendMsg })(Contact)
