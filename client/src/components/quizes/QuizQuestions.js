import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Spinner } from 'reactstrap';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'

const QuizQuestions = ({ allQuizes, setQuizes, setQuestions, loading }) => {

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

        allQuizes && allQuizes.map(quiz => (
            (quiz._id === quizId) ?
                (nextQuestion < quiz.questions.length) ?
                    setCurrentQuestion(nextQuestion) :
                    setShowScore(true) :
                null))
    };

    if (!loading) {

        return (

            allQuizes && allQuizes.map(quiz => (

                (quiz._id === quizId) ?

                    (quiz.questions.length > 0) ?
                        <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80">

                            {showScore ?
                                <div className='score-section text-center'>

                                    <h5>You scored <b style={{ color: "#B4654A" }}>{score}</b> out of <b style={{ color: "#B4654A" }}>{quiz.questions.length}</b>
                                    </h5>

                                    <a href="/">
                                        <button type="button" className="btn btn-outline-info mt-3">
                                            Back Home
                                    </button>
                                    </a>

                                </div> :

                                <div className="question-view">
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

                                    <Row>
                                        <Col>
                                            <div className='answer d-flex flex-column mx-auto mt-2 w-25'>
                                                {quiz.questions && quiz.questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                                    <button className="answer-option my-3 p-2 btn btn-outline-info rounded" key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                                                        {answerOption.answerText}
                                                    </button>

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

const mapStateToProps = state => ({
    auth: state.authReducer,
    allQuizes: state.quizesReducer.allQuizes,
    questionsData: state.questionsReducer.questionsData,
    loading: state.questionsReducer.loading
});

export default connect(mapStateToProps, { setQuestions, setQuestionsLoading, setQuizes })(QuizQuestions)