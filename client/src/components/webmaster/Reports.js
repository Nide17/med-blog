import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { setScores } from '../../redux/scores/scores.actions'

const Reports = ({ userId, allScores, setScores }) => {

    useEffect(() => {
        setScores();
    }, [setScores]);

    return (
        <>
            <Row className="text-center m-5 d-flex justify-content-center">
                <h3>Your past scores</h3>
            </Row>

            <Row className="mx-0">
                {allScores && allScores.map(score => (

                    userId === score.taken_by._id ?

                        <Col sm="3" key={score._id} className="px-2 mt-2 users-toast">
                            <Toast>
                                <ToastHeader className="text-success">
                                    &nbsp;<strong> {score.quiz.title}</strong>
                                </ToastHeader>

                                <ToastBody>
                                    <p className="font-weight-bold">
                                        {score.taken_by.name}
                                    </p>
                                    <p><strong className="text-warning">Score: </strong>
                                        {score.marks}/{score.out_of}</p>
                                    <small className="text-center">
                                        On {score.test_date.split('T').slice(0, 2).join(' at ')}
                                    </small>
                                </ToastBody>
                            </Toast>

                        </Col> : null
                ))}
            </Row>
        </>
    )
}

Reports.propTypes = {
    auth: PropTypes.object,
    error: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    error: state.errorReducer,
    allScores: state.scoresReducer.allScores
});

export default connect(mapStateToProps, { setScores })(Reports)