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

            <Row>
                {allScores && allScores.map(score => (

                    userId === score.taken_by ?

                        <Col sm="4" key={score._id} className="m-3 users-toast">

                            <Toast>
                                <ToastHeader className="text-success">
                                    <strong>{score.quiz}</strong>
                                </ToastHeader>

                                <ToastBody>
                                    <p className="font-weight-bold">
                                        {score.taken_by}
                                    </p>
                                    <p><strong className="text-warning">Score: </strong>
                                        {score.marks}/{score.out_of}</p>
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