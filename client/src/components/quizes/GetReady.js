import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'
import { createScore } from '../../redux/scores/scores.actions'
import QuizQuestions from './QuizQuestions';

const GetReady = ({ quizes, setQuizes, setQuestions, createScore, auth }) => {

    useEffect(() => {
        // Inside this callback function, we set questions when the component is mounted.
        setQuestions();
        setQuizes();
    }, [setQuizes, setQuestions]);

    // Access route parameters
    const { quizId } = useParams()

    if (!quizes.isLoading) {

        return (

            quizes && quizes.allQuizes.map(quiz => (

                (quiz._id === quizId) ?

                        <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80" key={Math.floor(Math.random() * 1000)}>

                            <div className="question-view">

                                {/* Question */}
                                <Row>
                                    <Col>

                                        <Card body className='question-section text-center my-2 mx-auto w-75'>
                                            <CardTitle tag="h5" className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                                {quiz.title}&nbsp;({quiz.questions && quiz.questions.length})
                                            </CardTitle>

                                            <CardText>
                                                {quiz.description}
                                            </CardText>

                                            <div className='answer d-flex justify-content-center mx-auto mt-2 w-lg-50'>
                                                <Link to={`/attempt-quiz/${quiz._id}`}>
                                                    <Button className="btn btn-outline-primary mt-3">
                                                        Attempt Quiz
                                                    </Button>
                                                </Link>
                                            &nbsp;&nbsp;

                                            <Link to={'/'}>
                                                    <Button className="btn btn-outline-primary mt-3">
                                                        Back
                                            </Button>
                                                </Link>
                                            </div>

                                            <small className="mt-3">
                                                ~{quiz.category && quiz.category.title}~
                                            </small>

                                        </Card>

                                    </Col>
                                </Row>
                            </div>

                        </Container> :

                    null)))
    }
    else {

        return (<>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner color="warning" style={{ width: '10rem', height: '10rem' }} />
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <h4 className="blink_load">Loading Quiz ...</h4>
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="success" style={{ width: '10rem', height: '10rem' }} />
            </div>

        </>)
    }
}

GetReady.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    quizes: state.quizesReducer,
    questionsData: state.questionsReducer.questionsData
});

export default connect(mapStateToProps, { setQuestions, setQuestionsLoading, setQuizes, createScore })(GetReady)