import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap';

const CountDown = ({ initialSeconds, initialMinute, handleAnswerButtonClick }) => {

    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {

        let myInterval = setInterval(() => {

            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }

        }, 1000)

        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <Row>
            <Col>
                <div className="text-right text-danger mr-3">
                    {minutes === 0 && seconds === 0
                        ? <h3>{handleAnswerButtonClick(false)}</h3>

                        : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default CountDown
