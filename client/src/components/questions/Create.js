import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Create = () => {
    return (
        <Form className="mt-5 mx-5">
            <FormGroup row>
                <Label for="examplequestion" sm={2}>Question</Label>
                <Col sm={10}>
                    <Input type="text" name="question" id="examplequestion" placeholder="Question here ..." />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 1</Label>
                <Col sm={10}>
                    <Input type="text" name="answer" id="exampleanswer" placeholder="Answer here ..." />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 2</Label>
                <Col sm={10}>
                    <Input type="text" name="answer" id="exampleanswer" placeholder="Answer here ..." />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 3</Label>
                <Col sm={10}>
                    <Input type="text" name="answer" id="exampleanswer" placeholder="Answer here ..." />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 4</Label>
                <Col sm={10}>
                    <Input type="text" name="answer" id="exampleanswer" placeholder="Answer here ..." />
                </Col>
            </FormGroup>

            <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }} className="pl-0">
                    <Button>Submit</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default Create
