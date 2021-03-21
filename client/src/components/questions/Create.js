import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion } from '../../redux/questions/questions.actions';

const Create = props => {

    const [questionText, setQuestionText] = useState({
        questionText: '',
    })

    const [answerOptions, setAnswerOptions] = useState([
        { id: uuidv4(), answerText: '', isCorrect: false },
    ]);

    const onQuestionChangeHandler = e => {
        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
    }

    const handleChangeInput = (id, event) => {
        const newAnswerOptions = answerOptions.map(i => {
            if (id === i.id) {
                event.target.type === "checkbox" ?
                 i[event.target.name] = event.target.checked:
                 i[event.target.name] = event.target.value
                            }
            return i;
        })

        setAnswerOptions(newAnswerOptions);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            questionText: questionText.questionText,
            answerOptions
        }
        console.log(JSON.stringify(newQuestion));
        props.addQuestion(newQuestion);

    };

    const handleAddFields = () => {
        setAnswerOptions([...answerOptions, { id: uuidv4(), answerText: '', isCorrect: false }])
    }

    const handleRemoveFields = id => {
        const values = [...answerOptions];
        values.splice(values.findIndex(value => value.id === id), 1);
        setAnswerOptions(values);
    }

    return (
        <Form className="mt-5 mx-5" onSubmit={handleSubmit}>

            <FormGroup row>
                <Label for="examplequestion" sm={2}>Question</Label>
                <Col sm={10}>
                    <Input type="text" name="questionText" value={questionText.questionText || ""} id="examplequestion" placeholder="Question here ..." onChange={onQuestionChangeHandler} />
                </Col>
            </FormGroup>

            { answerOptions.map(answerOption => (

                <div key={answerOption.id}>

                    <FormGroup row>
                        <Label for="exampleanswer" sm={2}>Answer</Label>

                        <Col sm={7}>
                            <Input type="text" name="answerText" value={answerOption.answerText}
                                onChange={event => handleChangeInput(answerOption.id, event)} id="exampleanswer" placeholder="Answer here ..." />
                        </Col>

                        <Col sm={2} className="d-flex justify-content-around">
                            <CustomInput type="checkbox" name="isCorrect" value={answerOption.isCorrect}
                                onChange={event => handleChangeInput(answerOption.id, event)} id={answerOption.id} label="Is Correct?" />
                        </Col>

                        <Col sm={1}>
                            <Button disabled={answerOptions.length === 1} color="danger" onClick={() => handleRemoveFields(answerOption.id)}> - </Button>{' '}
                            <Button color="danger" onClick={handleAddFields}> + </Button>{' '}
                        </Col>

                    </FormGroup>

                </div>

            ))}

            <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }} className="pl-0">
                    <Button className="btn btn-info btn-sm" type="submit" onClick={handleSubmit}>Add New</Button>
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
