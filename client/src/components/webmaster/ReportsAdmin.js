import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { Row, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { setScores } from '../../redux/scores/scores.actions'

const ReportsAdmin = ({ auth, scores, setScores }) => {

    useEffect(() => {
        setScores();
    }, [setScores]);

    return (

        auth.isAuthenticated ?

            !scores.isLoading ?

                <>
                    <Row className="text-center m-3 mb-1 m-lg-5 d-flex justify-content-center past-scores">
                        <h3 className="mb-0 font-weight-bolder">Your past scores</h3>
                    </Row>

                    <Row className="mx-0">
                        {scores && scores.allScores.map(score => (

                            score.taken_by && score.taken_by._id === auth.user._id ?

                                <Col sm="3" key={score._id} className="px-2 mt-2 admin-toast">
                                    <Toast>
                                        <ToastHeader className="text-success">
                                            <strong>{score.quiz && score.quiz.title}</strong>&nbsp;
                                                <small className="d-flex align-items-center">
                                                ({score.category && score.category.title})
                                                </small>
                                        </ToastHeader>

                                        <ToastBody>

                                            {score.review && score.review.questions.length > 0 ?

                                                <Link to={`/review-quiz/${score.id}`} className="font-weight-bold text-info">
                                                    Review answers
                                                </Link> :
                                                <p className="text-danger">Review unavailable!</p>}

                                            <p className="mt-1">Score:&nbsp;
                                        <strong className="text-warning">
                                                    {score.marks}/{score.out_of}
                                                </strong>
                                            </p>
                                            <small className="text-center">
                                                On {score.test_date.split('T').slice(0, 2).join(' at ')}
                                            </small>
                                        </ToastBody>
                                    </Toast>

                                </Col> : null
                        ))}
                    </Row></> :

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

ReportsAdmin.propTypes = {
    auth: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    scores: state.scoresReducer
});

export default connect(mapStateToProps, { setScores })(ReportsAdmin)