import React, { useEffect } from 'react';
import { Row, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { setQuestions, deleteQuestion } from '../../redux/questions/questions.actions'
import trash from '../../images/trash.svg';
import EditIcon from '../../images/edit.svg';

const SingleQuestion = ({ auth, questionsData, setQuestions, deleteQuestion }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuestions();
    }, [setQuestions]);

    // Access route parameters
    const { questionId } = useParams()
    const { push } = useHistory()

    const deleteQn = () => {
        deleteQuestion(questionId)
        push('/webmaster')
    }

    return (
        auth.isAuthenticated ?

            <>
                {questionsData && questionsData.map(question => (

                    (question._id === questionId) ?
                        <div className="mt-5 mx-5 single-category" key={question._id}>

                            <Row className="m-4 d-block text-primary">

                                <div className="d-flex justify-content-between title-actions">
                                    <h4 className="mb-4">{question.questionText}</h4>

                                    <div className="actions">
                                        <img src={trash} alt="" width="16" height="16" className="mr-3" onClick={deleteQn} />

                                        <Link to={`/edit-question/${question._id}`} className="text-secondary">
                                            <img src={EditIcon} alt="" width="16" height="16" className="mr-3" />
                                        </Link>
                                    </div>
                                </div>

                                <ListGroup>
                                    {question && question.answerOptions.map(answerOpt => (
                                        <ListGroupItem color={answerOpt.isCorrect ? 'success' : ''} key={answerOpt._id}>
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

export default connect(mapStateToProps, { setQuestions, deleteQuestion })(SingleQuestion);