import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Spinner, Button } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setReviews } from '../../redux/reviews/reviews.actions'

const ReviewQuiz = ({ reviews, setReviews, auth }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [lastAnswer, setLastAnswer] = useState(false);

    useEffect(() => {
        // Inside this callback function, we set questions when the component is mounted.
        setReviews();
    }, [setReviews]);

    // Access route parameters
    const { reviewId } = useParams()
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    const handleNextAnswer = () => {

        const nextQuestion = currentQuestion + 1;

        reviews && reviews.allReviews.map(review => (
            (review.id === reviewId) ?
                (nextQuestion < review.questions.length) ?
                    setCurrentQuestion(nextQuestion) :
                    setLastAnswer(true) :
                null))
    };

    const handlePrevAnswer = () => {

        const prevQuestion = currentQuestion - 1;

        reviews && reviews.allReviews.map(review => (
            (review.id === reviewId) ?
                (prevQuestion >= 0) ?
                    setCurrentQuestion(prevQuestion) :
                    alert('No previous available!') :
                null))
    };

    if (!reviews.isLoading) {

        return (

            reviews && reviews.allReviews.map(review => (

                (review.id === reviewId) ?

                    (review.questions.length > 0) ?
                        <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80" key={Math.floor(Math.random() * 1000)}>

                            {lastAnswer ?

                                auth.isAuthenticated ?

                                    <div className='score-section text-center'>

                                        <h5 className="text-center font-weight-bold">Reviewing finished!</h5>

                                        <button type="button" className="btn btn-outline-success mt-3" onClick={goBack}>
                                            Retake
                                            </button>

                                        &nbsp;&nbsp;
                                        <a href="/">
                                            <button type="button" className="btn btn-outline-info mt-3">
                                                Back Home
                                            </button>
                                        </a>

                                    </div> :

                                    <div className='score-section text-center'>
                                        <h5>Only members are allowed!</h5>
                                    </div> :

                                <div className="question-view">
                                    <Row>
                                        <Col>
                                            <h6 className="text-warning mb-5 ml-lg-5">Reviewing ...</h6>
                                            <div className='question-section my-2 mx-auto w-75'>
                                                <h4 className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                                    <span>Question <b style={{ color: "#B4654A" }}>{currentQuestion + 1}</b></span>/{review.questions.length}
                                                </h4>
                                                <h5 className='q-txt mt-4 font-weight-bold text-center'>{review.questions[currentQuestion].questionText && review.questions[currentQuestion].questionText}</h5>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <div className='answer d-flex flex-column mx-auto mt-2 w-25'>
                                                {review.questions && review.questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                                    <button
                                                        className={`answer-option my-3 p-2 btn btn-outline-${answerOption.isCorrect ? 'success' : 'danger'} rounded`}
                                                        key={index}>
                                                        {answerOption.answerText}
                                                    </button>

                                                ))}
                                            </div>
                                            <div className="prevNext d-flex justify-content-between">
                                                <Button color="info" className="ml-5" onClick={handlePrevAnswer}>Previous</Button>
                                                <Button color="info" className="mr-5" onClick={handleNextAnswer}>
                                                    {lastAnswer ? 'End' : 'Next'}</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>}

                        </Container> :

                        <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80">
                            <h5>No questions to show!</h5>
                        </Container> :

                    null)))
    }
    else {

        return (<>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner color="warning" style={{ width: '10rem', height: '10rem' }} />
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <h4 className="blink_load">Loading questions ...</h4>
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="success" style={{ width: '10rem', height: '10rem' }} />
            </div>

        </>)
    }
}

ReviewQuiz.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    reviews: state.reviewsReducer
});

export default connect(mapStateToProps, { setReviews })(ReviewQuiz)