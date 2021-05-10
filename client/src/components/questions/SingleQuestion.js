import React, { useEffect } from 'react';
import { Row, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { connect } from 'react-redux';
import { setQuestions, deleteQuestion } from '../../redux/questions/questions.actions'
import trash from '../../images/trash.svg';
import EditIcon from '../../images/edit.svg';
import ChangeQuizModal from './ChangeQuizModal';

const SingleQuestion = ({ auth, quest, setQuestions, deleteQuestion }) => {

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

            quest.isLoading ?

                <div className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">
                    <ReactLoading type="cylon" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                </div> :

                <>
                    {quest && quest.questionsData.map(question => (

                        (question._id === questionId) ?
                            <div className="mt-5 mx-3 mx-lg-5 single-category" key={question._id}>

                                <Row className="mb-3">
                                    <Breadcrumb>
                                        <BreadcrumbItem>
                                            <Link to={`/category/${question.category && question.category._id}`}>{question.category && question.category.title}</Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbItem>
                                            <Link to={`/view-quiz/${question.quiz && question.quiz._id}`}>{question.quiz && question.quiz.title}</Link>
                                        </BreadcrumbItem>

                                        <BreadcrumbItem active>View Question</BreadcrumbItem>
                                    </Breadcrumb>
                                </Row>

                                <Row className="m-4 d-block text-primary">

                                    <div className="d-lg-flex mb-5 justify-content-between title-actions">
                                        <h4 className="mb-4">{question.questionText}</h4>

                                        <div className="actions d-flex align-items-center">
                                            <ChangeQuizModal questionID={question._id} questionCatID={question.category && question.category._id} quizID={question.quiz._id} />

                                            <img src={trash} alt="" width="16" height="16" className="mx-2" onClick={deleteQn} />

                                            <Link to={`/edit-question/${question._id}`} className="text-secondary">
                                                <img src={EditIcon} alt="" width="16" height="16" />
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

const mapStateToProps = state => ({
    auth: state.authReducer,
    quest: state.questionsReducer
});

export default connect(mapStateToProps, { setQuestions, deleteQuestion })(SingleQuestion);