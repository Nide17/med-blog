import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Card, Button, CardTitle, CardText, Spinner } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'

const GetReady = ({ quizes, setQuizes }) => {

    useEffect(() => {
        // Inside this callback function, we set questions when the component is mounted.
        setQuizes();
    }, [setQuizes]);

    // Access route parameters
    const { quizId } = useParams()

    if (!quizes.isLoading) {

        const quizToTake = quizes && quizes.allQuizes.find(quiz =>
            quiz._id === quizId ? quiz : null)

        return (

            quizToTake ?

                <Container className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80">

                    <div className="question-view">

                        <Row>
                            <Col>

                                <Card body className='question-section text-center my-2 mx-auto w-75'>
                                    <CardTitle tag="h5" className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                        {quizToTake.title}&nbsp;({quizToTake.questions && quizToTake.questions.length})
                                    </CardTitle>

                                    <CardText>
                                        {quizToTake.description}
                                    </CardText>

                                    <div className='answer d-flex justify-content-center mx-auto mt-2 w-lg-50'>
                                        <Link to={`/attempt-quiz/${quizToTake._id}`}>
                                            <Button className="btn btn-outline-primary mt-3">
                                                Attempt Quiz
                                            </Button>
                                        </Link>
                                        &nbsp;&nbsp;

                                        <Link to={'/'}>
                                            <Button className="btn btn-outline-primary mt-3">
                                                Back
                                            </Button>
                                        </Link>
                                    </div>

                                    <small className="mt-3">
                                        ~{quizToTake.category && quizToTake.category.title}~
                                    </small>

                                </Card>

                            </Col>
                        </Row>
                    </div>

                </Container> :

                <div className="pt-5 d-flex justify-content-center align-items-center">
                    <h4 className="pt-lg-5 mt-lg-5 text-danger">This quiz is unavailable! <a href="/allposts">click here for more quizes!</a></h4>
                </div>)
    }
    else {

        return (<>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner color="warning" style={{ width: '10rem', height: '10rem' }} />
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <h4 className="blink_load">Loading Quiz ...</h4>
            </div>
            <div className="pt-5 d-flex justify-content-center align-items-center">
                <Spinner type="grow" color="success" style={{ width: '10rem', height: '10rem' }} />
            </div>
        </>)
    }
}

GetReady.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    quizes: state.quizesReducer
});

export default connect(mapStateToProps, { setQuizes })(GetReady)