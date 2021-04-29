import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Button, Row, Col, Form, FormGroup, Label, Input, CustomInput, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { connect } from 'react-redux';
import { addQuestion } from '../../redux/questions/questions.actions';
import { setCategories } from '../../redux/categories/categories.actions'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setQuestions } from '../../redux/questions/questions.actions'

const CreateQuestions = ({ auth, allQuizes, addQuestion, setCategories, setQuizes, setQuestions }) => {

    const [questionText, setQuestionText] = useState({
        questionText: '',
    })

    const [answerOptions, setAnswerOptions] = useState([
        { id: uuidv4(), answerText: '', isCorrect: false },
    ]);

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    // Lifecycle methods
    useEffect(() => {
        setCategories();
        setQuizes();
        setQuestions();
    }, [setCategories, setQuizes, setQuestions]);

    const onQuestionChangeHandler = e => {
        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
    }

    const handleAnswerChangeInput = (id, event) => {
        const newAnswerOptions = answerOptions.map(i => {
            if (id === i.id) {
                event.target.type === "checkbox" ?
                    i[event.target.name] = event.target.checked :
                    i[event.target.name] = event.target.value
            }
            return i;
        })

        setAnswerOptions(newAnswerOptions);
    }

    // Access route parameters
    const { quizId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDATE
        if (questionText.questionText.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (questionText.questionText.length > 300) {
            setErrorsState(['Question is too long!']);
            return
        }

        else if (answerOptions.length <= 1) {
            alert('Answers are not sufficient!')
            return
        }

        const qnQuiz = allQuizes && allQuizes.find(quiz =>
            quiz._id === quizId ? quiz : null)

        const newQuestion = {
            questionText: questionText.questionText,
            answerOptions,
            category: qnQuiz.category._id,
            creation_date: Date.now,
            quiz: quizId,
            created_by: auth.isLoading === false ? auth.user._id : null
        }
        addQuestion(newQuestion);

        // Reset form fields
        setQuestionText({ questionText: '' })
        setAnswerOptions([{ id: uuidv4(), answerText: '', isCorrect: false }])
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
        auth.isAuthenticated ?

            <Form className="mt-5 mx-5" onSubmit={handleSubmit}>

                {
                    allQuizes && allQuizes.map(quiz =>
                        quiz._id === quizId ?
                            (<Row key={quiz._id} className="mb-3">
                                <Breadcrumb key={quiz._id}>
                                    <BreadcrumbItem><Link to="/webmaster">{quiz.category.title}</Link></BreadcrumbItem>
                                    <BreadcrumbItem><Link to={`/category/${quiz.category._id}`}>{quiz.title}</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Create Question</BreadcrumbItem>
                                </Breadcrumb>
                            </Row>) : ''
                    )
                }

                {/* Error */}
                {errorsState.length > 0 ?
                    errorsState.map(err =>
                        <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                            {err}
                        </Alert>) :
                    null
                }

                <FormGroup row>
                    <Label for="examplequestion" sm={2}>Question</Label>
                    <Col sm={10}>
                        <Input type="text" name="questionText" value={questionText.questionText || ""} id="examplequestion" placeholder="Question here ..." onChange={onQuestionChangeHandler} required />
                    </Col>
                </FormGroup>

                {answerOptions.map(answerOption => (

                    <div key={answerOption.id}>

                        <FormGroup row>
                            <Label for="exampleanswer" sm={2}>Answer</Label>

                            <Col sm={10} xl={7}>
                                <Input type="text" name="answerText" value={answerOption.answerText}
                                    onChange={event => handleAnswerChangeInput(answerOption.id, event)} id="exampleanswer" placeholder="Answer here ..." required />
                            </Col>

                            <Col sm={6} xl={2} className="my-3 my-sm-2 d-sm-flex justify-content-around">
                                <CustomInput type="checkbox" name="isCorrect" value={answerOption.isCorrect}
                                    onChange={event => handleAnswerChangeInput(answerOption.id, event)} id={answerOption.id} label="Is Correct?" required />
                            </Col>

                            <Col sm={6} xl={1} className="my-3 my-sm-2">
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

            </Form> :

            // If not authenticated or loading
            <div className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

// Map the question to state props
const mapStateToProps = state => ({
    question: state.questionsReducer,
    auth: state.authReducer,
    categories: state.categoriesReducer,
    allQuizes: state.quizesReducer.allQuizes
});

export default connect(
    mapStateToProps,
    { addQuestion, setCategories, setQuizes, setQuestions })(CreateQuestions);