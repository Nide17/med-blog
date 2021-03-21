import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion } from '../../redux/questions/questions.actions';

const Create = props => {

    const [questionText, setQuestionText] = useState('')
    const [answerText, setAnswerText] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    const onQuestionChangeHandler = e => {
        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
    }

    const onAnswerChangeHandler = e => {
        const { name, value } = e.target
            setAnswerText(state => ({ ...state, [name]: value }))
    }

    const onIsCorrectChangeHandler = e => {
        const { value } = e.target
        setIsCorrect(state => ({ ...state, isCorrect: value }))
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        // Add Question via addQuestion action 
        const newQuestion = {
            questionText: questionText.questionText,
            answerOptions: [
                {
                    answerText: answerText.answerText,
                    isCorrect: isCorrect.isCorrect
                }
            ]
        }
        console.log(JSON.stringify(newQuestion));
        // props.addQuestion(question);
    }

    return (
        <Form className="mt-5 mx-5" onSubmit={onSubmitHandler}>

            <FormGroup row>
                <Label for="examplequestion" sm={2}>Question</Label>
                <Col sm={10}>
                    <Input type="text" name="questionText" value={questionText.questionText || ""} id="examplequestion" placeholder="Question here ..." onChange={onQuestionChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 1</Label>
                <Col sm={8}>
                    <Input type="text" name="answerText" value={answerText[0] || ""} id="exampleanswer" placeholder="Answer here ..." onChange={onAnswerChangeHandler} />
                </Col>
                <Col sm={2} className="d-flex justify-content-around">
                    <CustomInput type="checkbox" id="check1" label="Is Correct?" onChange={onIsCorrectChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 2</Label>
                <Col sm={8}>
                    <Input type="text" name="answerText" value={answerText[1] || ""} id="exampleanswer" placeholder="Answer here ..." onChange={onAnswerChangeHandler} />
                </Col>
                <Col sm={2} className="d-flex justify-content-around">
                    <CustomInput type="checkbox" id="check2" label="Is Correct?" onChange={onIsCorrectChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 3</Label>
                <Col sm={8}>
                    <Input type="text" name="answerText" value={answerText[2] || ""} id="exampleanswer" placeholder="Answer here ..." onChange={onAnswerChangeHandler} />
                </Col>
                <Col sm={2} className="d-flex justify-content-around">
                    <CustomInput type="checkbox" id="check3" label="Is Correct?" onChange={onIsCorrectChangeHandler} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleanswer" sm={2}>Answer 4</Label>
                <Col sm={8}>
                    <Input type="text" name="answerText" value={answerText[3] || ""} id="exampleanswer" placeholder="Answer here ..." onChange={onAnswerChangeHandler} />
                </Col>
                <Col sm={2} className="d-flex justify-content-around">
                    <CustomInput type="checkbox" id="check4" label="Is Correct?" onChange={onIsCorrectChangeHandler} />
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
