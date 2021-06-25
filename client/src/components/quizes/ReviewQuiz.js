import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Badge } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { connect } from 'react-redux'
import { setScores } from '../../redux/scores/scores.actions'

const ReviewQuiz = ({ auth, scores, setScores }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [lastAnswer, setLastAnswer] = useState(false);

    // Lifecycle methods
    useEffect(() => {
        setScores();
    }, [setScores]);

    // Access route parameters
    const { reviewId } = useParams()

    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    const handleNextAnswer = () => {

        const nextQuestion = currentQuestion + 1;

        scores && scores.allScores.map(score => (
            (score.id === reviewId) ?
                (nextQuestion < score.review.questions.length) ?
                    setCurrentQuestion(nextQuestion) :
                    setLastAnswer(true) :
                null))
    };

    const handlePrevAnswer = () => {

        const prevQuestion = currentQuestion - 1;

        scores && scores.allScores.map(score => (
            (score.id === reviewId) ?
                (prevQuestion >= 0) ?
                    setCurrentQuestion(prevQuestion) :
                    alert('No previous available!') :
                null))
    };

    return (
        auth.isAuthenticated ?

            !scores.isLoading ?

                scores && scores.allScores.map(score => (

                    score.id === reviewId ?

                        score.review.questions.length > 0 ?
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
                                            <div className="d-flex justify-content-around">
                                                    <h6 className="text-warning">Reviewing ...</h6>
                                                    <Button outline color="success" size="sm">
                                                    <a href="/webmaster">Your past scores</a>
                                                    </Button>
                                            </div>

                                                <div className='question-section my-2 mx-auto w-75'>
                                                    <h4 className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                                        <span>Question <b style={{ color: "#B4654A" }}>{currentQuestion + 1}</b></span>/{score.review.questions.length}
                                                    </h4>
                                                    <h5 className='q-txt mt-4 font-weight-bold text-center'>{score.review.questions[currentQuestion].questionText && score.review.questions[currentQuestion].questionText}</h5>

                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <div className='answer d-flex flex-column mx-auto mt-2 w-25'>
                                                    {score.review.questions && score.review.questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                                        <button
                                                            key={index}
                                                            className={`answer-option my-3 p-2 btn btn-outline-${answerOption.isCorrect ? 'success font-weight-bolder' :
                                                                !answerOption.isCorrect && answerOption.choosen ? 'danger font-weight-bolder' : 'secondary'} rounded`}>
                                                            {answerOption.answerText}
                                                        </button>

                                                    ))}
                                                </div>

                                                <div className="prevNext d-flex justify-content-between align-items-center mt-5">
                                                    <Button color="info" className="ml-0 ml-md-5 p-1 px-md-2" onClick={handlePrevAnswer}>Previous</Button>

                                                    {score.review.questions && score.review.questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                                        answerOption.isCorrect && answerOption.choosen ?
                                                            <ul key={index} className="d-md-flex list-inline mb-0 mt-2">
                                                                <li>
                                                                    <Badge href="#" color="success">Your answer is correct</Badge>
                                                                </li>
                                                            </ul> :

                                                            !answerOption.isCorrect && answerOption.choosen ?
                                                                <ul key={index} className="d-md-flex list-inline mb-0 mt</ul>-2">
                                                                    <li className="ml-md-3">
                                                                        <Badge href="#" color="danger">Your incorrect answer</Badge>
                                                                    </li>
                                                                    <li className="ml-md-3">
                                                                        <Badge href="#" color="success">Correct answer</Badge>
                                                                    </li>
                                                                </ul> : null

                                                    ))}

                                                    <Button color="info" className="mr-0 mr-md-5 p-1 px-md-2" onClick={handleNextAnswer}>
                                                        {lastAnswer ? 'End' : 'Next'}</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>}

                            </Container> :

                            <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80">
                                <h5>No questions to show!</h5>
                            </Container> :

                        null)) :

                <div className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">
                    <ReactLoading type="cylon" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                </div> :

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

ReviewQuiz.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    scores: state.scoresReducer
})

export default connect(mapStateToProps, { setScores })(ReviewQuiz)