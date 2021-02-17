import React, { useState } from 'react'
import { Container, Col, Row } from 'reactstrap';
import questions from './questions'

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerButtonClick = (isCorrect) => {

        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (

        <Container className="d-flex flex-column justify-content-center rounded border border-primary my-5 py-5 w-80">
            {showScore ?
                <div className='score-section text-center'><h5>You scored <b style={{ color: "#B4654A" }}>{score}</b> out of <b style={{ color: "#B4654A" }}>{questions.length}</b></h5></div> :

                <>
                    <Row>
                        <Col>
                            <div className='question-section my-2 mx-auto w-75'>
                                <h4 className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                    <span>Question <b style={{ color: "#B4654A" }}>{currentQuestion + 1}</b></span>/{questions.length}
                                </h4>
                                <h5 className='q-txt mt-4 font-weight-bold text-center'>{questions[currentQuestion].questionText}</h5>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className='answer d-flex flex-column mx-auto mt-2 w-25'>
                                {questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                    <button style={{color: "black"}} className="answer-option my-3 p-2 btn btn-outline-info rounded" key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>

                                ))}
                            </div>
                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default Quiz
