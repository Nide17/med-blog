import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Spinner } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'
import { createScore } from '../../redux/scores/scores.actions'
import CountDown from './CountDown';

const QuizQuestions = ({ quizes, setQuizes, setQuestions, createScore, auth }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Inside this callback function, we set questions when the component is mounted.
        setQuestions();
        setQuizes();
    }, [setQuizes, setQuestions]);

    // Access route parameters
    const { quizId } = useParams()

    const handleAnswerButtonClick = (isCorrect) => {

        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;

        quizes && quizes.allQuizes.map(quiz => (
            (quiz._id === quizId) ?
                (nextQuestion < quiz.questions.length) ?
                    setCurrentQuestion(nextQuestion) :
                    setShowScore(true) :
                null))
    };

    const Reload = () => window.location.reload()

    if (!quizes.isLoading) {

        return (

            quizes && quizes.allQuizes.map(quiz => (

                (quiz._id === quizId) ?

                    (quiz.questions.length > 0) ?
                        <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80" key={Math.floor(Math.random() * 1000)}>

                            {showScore ?

                                auth.isAuthenticated ?

                                    createScore({
                                        marks: score,
                                        out_of: quiz.questions.length,
                                        category: quiz.category._id,
                                        quiz: quiz._id,
                                        taken_by: auth.isLoading === false ? auth.user._id : null
                                    }) &&

                                    <div className='score-section text-center'>

                                        <h5>You scored <b style={{ color: "#B4654A" }}>{score}</b> out of <b style={{ color: "#B4654A" }}>{quiz.questions.length}</b>
                                        </h5>

                                        <button type="button" className="btn btn-outline-success mt-3" onClick={Reload}>
                                            Retake
                                            </button>
                                        &nbsp;&nbsp;
                                        <Link to={`/review-quiz/${quiz._id}`}>
                                            <button type="button" className="btn btn-outline-success mt-3">
                                                Review
                                            </button>
                                        </Link>

                                    </div> :

                                    <div className='score-section text-center'>

                                        <h5>You scored <b style={{ color: "#B4654A" }}>{score}</b> out of <b style={{ color: "#B4654A" }}>{quiz.questions.length}</b>
                                        </h5>

                                        <a href={`/view-quiz/${quiz._id}`}>
                                            <button type="button" className="btn btn-outline-success mt-3" onClick={Reload}>
                                                Retake
                                            </button>
                                        </a>
                                        &nbsp;&nbsp;
                                        <Link to='/'>
                                            <button type="button" className="btn btn-outline-success mt-3">
                                                Back Home
                                            </button>
                                        </Link>

                                    </div> :

                                <div className="question-view">

                                    {/* Countdown */}
                                    <CountDown
                                        handleAnswerButtonClick={handleAnswerButtonClick}
                                        timeInSecs={quiz.questions && quiz.questions[currentQuestion].answerOptions.length * 20} />

                                    {/* Question */}
                                    <Row>
                                        <Col>
                                            <div className='question-section my-2 mx-auto w-75'>
                                                <h4 className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                                    <span>Question <b style={{ color: "#B4654A" }}>{currentQuestion + 1}</b></span>/{quiz.questions.length}
                                                </h4>

                                                <h5 className='q-txt mt-4 font-weight-bold text-center'>{quiz.questions[currentQuestion].questionText && quiz.questions[currentQuestion].questionText}</h5>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Answers */}
                                    <Row>
                                        <Col>
                                            <div className='answer d-flex flex-column mx-auto mt-2 w-lg-50'>

                                                {quiz.questions && quiz.questions[currentQuestion].answerOptions.sort(() => 0.5 - Math.random()).map((answerOption, index) => (

                                                    <li key={index} style={{ listStyleType: "upper-latin" }} className="text-info font-weight-bold">
                                                        <button className="answer-option my-3 p-2 btn btn-outline-info rounded" onClick={() => handleAnswerButtonClick(answerOption.isCorrect)} style={{ width: "96%" }}>
                                                            {answerOption.answerText}
                                                        </button>
                                                    </li>
                                                ))}

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

QuizQuestions.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    quizes: state.quizesReducer,
    questionsData: state.questionsReducer.questionsData
});

export default connect(mapStateToProps, { setQuestions, setQuestionsLoading, setQuizes, createScore })(QuizQuestions)