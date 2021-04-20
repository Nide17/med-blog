import React, { useEffect } from 'react';
import { Row, Col, Toast, ToastBody, ToastHeader, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem } from 'reactstrap';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setQuestions } from '../../redux/questions/questions.actions'

const SingleQuestion = ({ auth, questionsData, setQuestions }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuestions();
    }, [setQuestions]);

    // Access route parameters
    const { questionId } = useParams()

    return (
        auth.isAuthenticated ?

            <>
                {questionsData && questionsData.map(question => (

                    (question._id === questionId) ?
                        <div className="mt-5 mx-5 single-category">

                            <Row className="m-4 d-block text-primary">
                                <h4 className="mb-4">{question.questionText}</h4>
                                <ListGroup>
                                    {question && question.answerOptions.map(answerOpt => (
                                        <ListGroupItem color={answerOpt.isCorrect ? 'success' : ''}>
                                            {answerOpt.answerText}
                                        </ListGroupItem>)
                                    )}
                                </ListGroup>
                            </Row>
                        </div> : null))}
            </> :
            <h6 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Login Again!</h6>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    questionsData: state.questionsReducer.questionsData
});

export default connect(mapStateToProps, { setQuestions })(SingleQuestion);