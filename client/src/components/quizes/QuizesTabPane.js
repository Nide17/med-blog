import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane } from 'reactstrap';
import ReactLoading from "react-loading";

import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import EditQuiz from './EditQuiz';

import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'
import { setQuizes, deleteQuiz, updateQuiz } from '../../redux/quizes/quizes.actions'

import trash from '../../images/trash.svg';
import AddIcon from '../../images/plus.svg';

const QuizesTabPane = ({ currentUser, quizes, setQuizes, setQuestions, deleteQuiz }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
        setQuestions();
    }, [setQuizes, setQuestions]);

    return (

        <TabPane tabId="2">

            {quizes.isLoading ? <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                <Row>
                    {quizes.allQuizes && quizes.allQuizes.map(quiz => (

                        currentUser.role === 'Admin' || currentUser._id === quiz.created_by._id ?

                            <Col sm="4" key={quiz._id} className="mt-3 quiz-toast">

                                <Toast>
                                    <ToastHeader className="text-success">
                                        <strong>{quiz.title}</strong>
                                        <div className="actions text-secondary d-flex">

                                            <img src={trash} alt="" width="16" height="16" className="mr-3 mt-1" onClick={() => deleteQuiz(quiz._id)} />

                                            <EditQuiz qId={quiz._id} qTitle={quiz.title} qDesc={quiz.description} />

                                            <Link to={`/questions-create/${quiz._id}`} className="text-secondary">
                                                <img src={AddIcon} alt="" width="12" height="12" className="" /> <small>Questions</small>
                                            </Link>

                                        </div>

                                    </ToastHeader>

                                    <ToastBody>
                                        <small>({quiz.created_by.name})</small>
                                        <br />
                                        {quiz.description}
                                        <br /><br />
                                        {quiz.questions && quiz.questions.length > 0 ? <p className="font-weight-bold">Questions ({quiz.questions.length})</p> : null}

                                        {quiz.questions && quiz.questions.map((question, index) =>
                                            <ul key={question._id}>
                                                <li style={{ listStyle: "none" }}>
                                                    {index + 1}.&nbsp;
                                                    <Link to={`/view-question/${question._id}`}>
                                                        {question.questionText}
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </ToastBody>

                                </Toast>

                            </Col> : null
                    ))}
                </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    quizes: state.quizesReducer,
    questionsData: state.questionsReducer.questionsData
})

export default connect(mapStateToProps, { setQuizes, setQuestions, setQuestionsLoading, updateQuiz, deleteQuiz })(QuizesTabPane)