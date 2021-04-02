import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Button, Col, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion } from '../../redux/questions/questions.actions';
import { setCategories } from '../../redux/categories/categories.actions'

const CreateQuiz = ({ auth, categories, addQuestion, setCategories }) => {

    const [questionText, setQuestionText] = useState({
        questionText: '',
    })

    const [answerOptions, setAnswerOptions] = useState([
        { id: uuidv4(), answerText: '', isCorrect: false },
    ]);


    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDATE
        if (!questionText.questionText) {
            alert('Please fill all fields!')
            return
        }

        else if (answerOptions.length <= 1) {
            alert('Answers are not sufficient!')
            return
        }

        const newQuestion = {
            questionText: questionText.questionText,
            answerOptions
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

    // Access route parameters
    const { categoryId } = useParams()

    return (
        auth.isAuthenticated ?
            <Form className="mt-5 mx-5" onSubmit={handleSubmit}>

                {
                    categories.allcategories && categories.allcategories.map(category =>
                        category._id === categoryId ?
                            (<h3 key={category._id} className="text-center mb-4">
                            <strong>{category.title} Quiz</strong>
                            </h3>) : ''
                    )
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
            <h3 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Access denied! Login first</h3>
    )
}

// Map the question to state props
const mapStateToProps = state => ({
    question: state.questionsReducer,
    auth: state.authReducer,
    categories: state.categoriesReducer
});

export default connect(
    mapStateToProps,
    { addQuestion, setCategories })(CreateQuiz);
