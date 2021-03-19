import React, { useState, useEffect } from 'react'
import { Container, Col, Row } from 'reactstrap';

import { connect } from 'react-redux'
import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'

const Questions = props => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Inside this callback function, we set questions when the component is mounted.
        props.setQuestions();
    });

    const { questionsData } = props

    const handleAnswerButtonClick = (isCorrect) => {

        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questionsData.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    if (questionsData.length > 0) {

        return (

            <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-5 w-80">

                {showScore ?
                    <div className='score-section text-center'>
                    <h5>You scored <b style={{ color: "#B4654A" }}>{score}</b> out of <b style={{ color: "#B4654A" }}>{questionsData.length}</b>
                    </h5>
                        <a href="/questions">
                        <button type="button" class="btn btn-outline-info mt-3">Back to quiz
                        </button>
                        </a>
                    </div> :

                    <div className="question-view">
                        <Row>
                            <Col>
                                <div className='question-section my-2 mx-auto w-75'>
                                    <h4 className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                        <span>Question <b style={{ color: "#B4654A" }}>{currentQuestion + 1}</b></span>/{questionsData.length}
                                    </h4>
                                    <h5 className='q-txt mt-4 font-weight-bold text-center'>{questionsData[currentQuestion].questionText && questionsData[currentQuestion].questionText}</h5>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className='answer d-flex flex-column mx-auto mt-2 w-25'>
                                    {questionsData && questionsData[currentQuestion].answerOptions.map((answerOption, index) => (

                                        <button className="answer-option my-3 p-2 btn btn-outline-info rounded" key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                                            {answerOption.answerText}
                                        </button>

                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </Container>
        )
    }

    else return null
}

const mapStateToProps = state => ({
    questionsData: state.questionsReducer.questionsData
})

const mapDispatchToProps = (dispatch) => ({
    setQuestions: () => dispatch(setQuestions()),
    setQuestionsLoading: () => dispatch(setQuestionsLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)