import React, { useEffect } from 'react';
import { Row, Col, Toast, ToastBody, ToastHeader, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setQuizes } from '../../redux/quizes/quizes.actions'

const SingleQuiz = ({ auth, allQuizes, setQuizes }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
    }, [setQuizes]);

    // Access route parameters
    const { quizId } = useParams()

    return (
        auth.isAuthenticated ?

            <>
                {allQuizes && allQuizes.map(quiz => (

                    (quiz._id === quizId) ?
                        <div className="mt-5 mx-5 single-category">

                            <Row>
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/webmaster">{quiz.category.title}</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{quiz.title}</BreadcrumbItem>
                                </Breadcrumb>
                            </Row>

                            <Row className="m-4 d-flex justify-content-between align-items-center text-primary">
                                {quiz && quiz.questions.map(question => (

                                    <Col sm="4" className="mt-2" key={question._id}>

                                        <Toast className="text-center">

                                            <ToastHeader className="d-flex justify-content-between">
                                                {question.questionText}
                                            </ToastHeader>

                                            <ToastBody>
                                                <ListGroup>
                                                    {question.answerOptions.map(answer =>
                                                        <ListGroupItem color={answer.isCorrect ? 'success' : ''}>{answer.answerText}</ListGroupItem>)}
                                                </ListGroup>
                                                <small>Created on {question.creation_date.split('T').slice(0, 1)}</small>
                                            </ToastBody>

                                        </Toast>

                                    </Col>))}
                            </Row>
                        </div> : null))}
            </> :
            <h6 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Login Again!</h6>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    allQuizes: state.quizesReducer.allQuizes,
    questionsData: state.questionsReducer.questionsData
});

export default connect(mapStateToProps, { setQuizes })(SingleQuiz);