import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion } from '../../redux/questions/questions.actions';

const Create = props => {

    const [questionText, setQuestionText] = useState({
        questionText: '',
    })

    const [answerOptions, setAnswerOptions] = useState([
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: true
            },
            {
                answerText: '',
                isCorrect: false
            },
        ])

    const onChangeHandler = e => {
        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
        setAnswerOptions(state => ([ ...state, {[name]: value} ]))
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        // Add Question via addQuestion action 
        const newQuestion = {
            questionText,
            answerOptions
        }
        console.log(newQuestion);
        // props.addQuestion(question);
    }

    return (
        <Form className="mt-5 mx-5" onSubmit={onSubmitHandler}>
            <FormGroup row>
                <Label for="examplequestion" sm={2}>Question</Label>
                <Col sm={10}>
                    <Input type="text" name="questionText" id="examplequestion" placeholder="Question here ..." onChange={onChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 1</Label>
                <Col sm={10}>
                    <Input type="text" name="answerText" id="exampleanswer" placeholder="Answer here ..." onChange={onChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 2</Label>
                <Col sm={10}>
                    <Input type="text" name="answerText" id="exampleanswer" placeholder="Answer here ..." onChange={onChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 3</Label>
                <Col sm={10}>
                    <Input type="text" name="answerText" id="exampleanswer" placeholder="Answer here ..." onChange={onChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 4</Label>
                <Col sm={10}>
                    <Input type="text" name="answerText" id="exampleanswer" placeholder="Answer here ..." onChange={onChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }} className="pl-0">
                    <Button className="btn btn-info btn-sm">Add New</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

// Map the question to state props
const mapStateToProps = state => ({
    question: state.question
});

export default connect(
    mapStateToProps,
    { addQuestion })(Create);
