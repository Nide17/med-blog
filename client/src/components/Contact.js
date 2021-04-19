import React from 'react'
import { Jumbotron, Button, Col, Row, FormGroup, Input } from 'reactstrap';

const Contact = () => {
    return (
        <div>
            <Jumbotron className="m-md-5 py-0 text-center text-center">
                <h1 className="display-3 font-weight-bold">Let's connect!</h1>
                <p className="lead">
                    Med Blog is a web blog application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.
                </p>

                <hr className="my-2" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, est.</p>
                <p className="lead mt-4">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>

            <Row className="mx-2 px-1 mx-md-5 px-md-5 contact d-md-flex justify-content-center">

                <Col sm="12">
                    <h3 className="display-4 text-center mb-md-3">Contact the authors</h3>
                </Col>

                <Col sm="6" className="mb-5">
                    <FormGroup>
                        <Input type="email" name="email" placeholder="Name" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" placeholder="Email" />
                    </FormGroup>

                    <FormGroup row>
                        <Col>
                            <Input type="textarea" name="text" placeholder="Message" />
                        </Col>
                    </FormGroup>

                    <Button color="primary">Submit</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Contact
