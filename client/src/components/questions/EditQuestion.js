import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom'
import { Button, Row, Col, Form, FormGroup, Label, Input, CustomInput, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { setQuestions, updateQuestion } from '../../redux/questions/questions.actions';

const EditQuestion = ({ auth, updateQuestion, questionsData, setQuestions, allQuizes }) => {

    // Access route parameters & history
    const { questionId } = useParams()
    const { push } = useHistory()

    const selectedQuestion = questionsData && questionsData.find(qn =>
        qn._id === questionId ? qn : null)


    const [questionTextState, setQuestionTextState] = useState({
        questionText: selectedQuestion && selectedQuestion.questionText
    })

    const [answerOptionsState, setAnswerOptionsState] = useState(selectedQuestion && selectedQuestion.answerOptions);

    // Lifecycle methods
    useEffect(() => {
        setQuestions();
    }, [setQuestions]);

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    const onQuestionChangeHandler = e => {
        const { name, value } = e.target
        setQuestionTextState(questionTextState => ({ ...questionTextState, [name]: value }))
    }

    const handleAnswerChangeInput = (id, event) => {
        const updatedAnswerOptions = answerOptionsState && answerOptionsState.map(oneAnswer => {

            if (id === oneAnswer._id) {

                event.target.type === "checkbox" ?
                    oneAnswer[event.target.name] = event.target.checked :
                    oneAnswer[event.target.name] = event.target.value
            }
            return oneAnswer;
        })

        setAnswerOptionsState((updatedAnswerOptions));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDATE
        if (questionTextState.questionText.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (questionTextState.questionText.length > 300) {
            setErrorsState(['Question is too long!']);
            return
        }

        else if (answerOptionsState.length <= 1) {
            alert('Answers are not sufficient!')
            return
        }

        const updatedQuestion = {
            qtId: questionId,
            questionText: questionTextState.questionText,
            answerOptions: answerOptionsState
        }
        updateQuestion(updatedQuestion);

        // Back to webmaster
        push('/webmaster')
    };

    const handleAddFields = () => {
        setAnswerOptionsState([...answerOptionsState, { answerText: '', isCorrect: false }])
    }

    const handleRemoveFields = _id => {

        const values = [...answerOptionsState];
        values.splice(values.findIndex(value => value._id === _id), 1);
        console.log(values)
        setAnswerOptionsState(values);
    }

    return (
        auth.isAuthenticated ?

            <Form className="mt-5 mx-5" onSubmit={handleSubmit}>

                <Row className="mb-3">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to={`/category/${selectedQuestion.category && selectedQuestion.category._id}`}>{selectedQuestion.category && selectedQuestion.category.title}</Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <Link to={`/view-quiz/${selectedQuestion.quiz && selectedQuestion.quiz._id}`}>{selectedQuestion.quiz && selectedQuestion.quiz.title}</Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem active>Edit Question</BreadcrumbItem>
                    </Breadcrumb>
                </Row>

                {/* Error */}
                {errorsState.length > 0 ?
                    errorsState.map(err =>
                        <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                            {err}
                        </Alert>) :
                    null
                }

                <FormGroup row>
                    <Label for="examplequestion" sm={2}>Question Edit</Label>
                    <Col sm={10}>
                        <Input type="text" name="questionText" value={questionTextState.questionText} id="examplequestion" placeholder="Question here ..." onChange={onQuestionChangeHandler} required />
                    </Col>
                </FormGroup>

                {answerOptionsState && answerOptionsState.map(answerOption => (

                    <div key={answerOption._id}>

                        <FormGroup row>
                            <Label for="exampleanswer" sm={2}>Answer</Label>

                            <Col sm={10} xl={7}>
                                <Input type="text" name="answerText" value={answerOption.answerText}
                                    onChange={event => handleAnswerChangeInput(answerOption._id, event)} id="exampleanswer" placeholder="Answer here ..." required />
                            </Col>

                            <Col sm={6} xl={2} className="my-3 my-sm-2 d-sm-flex justify-content-around">
                                <CustomInput type="checkbox" name="isCorrect" value={answerOption.isCorrect}
                                    onChange={event => handleAnswerChangeInput(answerOption._id, event)} id={answerOption._id} label="Is Correct?" required checked={answerOption.isCorrect} />
                            </Col>

                            <Col sm={6} xl={1} className="my-3 my-sm-2">
                                <Button disabled={answerOptionsState.length === 1} color="danger" onClick={() => handleRemoveFields(answerOption._id)}> - </Button>{' '}
                                <Button color="danger" onClick={handleAddFields}> + </Button>{' '}
                            </Col>

                        </FormGroup>

                    </div>

                ))}

                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }} className="pl-0">
                        <Button className="btn btn-info btn-sm" type="submit" onClick={handleSubmit}>Update</Button>
                    </Col>
                </FormGroup>

            </Form>
            :
            <h3 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Login Again</h3>
    )
}

// Map the question to state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    categories: state.categoriesReducer,
    allQuizes: state.quizesReducer.allQuizes,
    questionsData: state.questionsReducer.questionsData
});

export default connect(mapStateToProps, { updateQuestion, setQuestions })(EditQuestion);