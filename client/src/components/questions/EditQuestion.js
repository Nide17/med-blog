import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { setQuestions, updateQuestion } from '../../redux/questions/questions.actions';

const EditQuestion = ({ auth, updateQuestion, questionsData, setQuestions }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuestions();
    }, [setQuestions]);

    // Access route parameters
    const { questionId } = useParams()

    // const selectedQuestion = questionsData && questionsData.map(qn =>
    //     qn._id === questionId ? qn : null)

    const selectedQuestion = questionsData && questionsData.find(qn => qn._id === questionId)

    const [questionText, setQuestionText] = useState({
        questionText: selectedQuestion.questionText
    })


    // const [answerOptions, setAnswerOptions] = useState([
    //     { id: uuidv4(), answerText: selectedQuestion.answerText, isCorrect: selectedQuestion.isCorrect }
    // ]);
    const [answerOptions, setAnswerOptions] = useState(selectedQuestion.answerOptions);

    // Errors state on form
    // const [errorsState, setErrorsState] = useState([])

    const onQuestionChangeHandler = e => {
        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
    }

    const handleAnswerChangeInput = (id, event) => {
        const updatedAnswerOptions = answerOptions.map(i => {
            if (id === i.id) {
                event.target.type === "checkbox" ?
                    i[event.target.name] = event.target.checked :
                    i[event.target.name] = event.target.value
            }
            return i;
        })

        setAnswerOptions(updatedAnswerOptions);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDATE
        // if (questionText.questionText.length < 4) {
        //     setErrorsState(['Insufficient info!']);
        //     return
        // }
        // else if (questionText.questionText.length > 300) {
        //     setErrorsState(['Question is too long!']);
        //     return
        // }

        // else if (answerOptions.length <= 1) {
        //     alert('Answers are not sufficient!')
        //     return
        // }

        // const catID = allQuizes && allQuizes.map(quiz =>
        //     quiz._id === questionId ? quiz.category._id : null)


        const updatedQuestion = {
            questionText,
            answerOptions
        }
        // updateQuestion(updatedQuestion);
        console.log(updatedQuestion);
        // Back to single question
        // 
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
        // auth.isAuthenticated ?
        <Form className="mt-5 mx-5" onSubmit={handleSubmit}>

            {/* {
                    allQuizes && allQuizes.map(quiz =>
                        quiz._id === questionId ?
                            (<Row key={quiz._id} className="mb-3">
                                <Breadcrumb key={quiz._id}>
                                    <BreadcrumbItem><Link to="/webmaster">{quiz.category.title}</Link></BreadcrumbItem>
                                    <BreadcrumbItem><Link to={`/category/${quiz.category._id}`}>{quiz.title}</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Create Question</BreadcrumbItem>
                                </Breadcrumb>
                            </Row>) : ''
                    )
                } */}

            {/* Error */}
            {/* {errorsState.length > 0 ?
                    errorsState.map(err =>
                        <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                            {err}
                        </Alert>) :
                    null
                } */}

            <FormGroup row>
                <Label for="examplequestion" sm={2}>Question Edit</Label>
                <Col sm={10}>
                {console.log(questionText)}
                    <Input type="text" name="questionText" value={questionText} id="examplequestion" placeholder="Question here ..." onChange={onQuestionChangeHandler} required />
                </Col>
            </FormGroup>
{/* 
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
            </FormGroup> */}

        </Form>
        //  :
        // <h3 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Login Again</h3>
    )
}

// Map the question to state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    categories: state.categoriesReducer,
    questionsData: state.questionsReducer.questionsData
});

export default connect(mapStateToProps, { updateQuestion, setQuestions })(EditQuestion);