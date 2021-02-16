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

        <Container>
            {showScore ?
                <div className='score-section'>You scored {score} out of {questions.length}</div> :

                <>
                    <Row>
                        <Col>
                            <div className='question-section mt-4'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <div className='q-txt'>{questions[currentQuestion].questionText}</div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className='answer d-flex flex-column mt-4'>
                                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                                    <button key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
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
