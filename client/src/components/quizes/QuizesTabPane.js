import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import EditQuiz from './EditQuiz';

import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'
import { setQuizes, deleteQuiz, updateQuiz } from '../../redux/quizes/quizes.actions'

import trash from '../../images/trash.svg';
import AddIcon from '../../images/plus.svg';

const QuizesTabPane = ({ allQuizes, setQuizes, setQuestions, deleteQuiz }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
        setQuestions();
    }, [setQuizes, setQuestions]);

    return (

        <TabPane tabId="2">
            <Row>
                {allQuizes && allQuizes.map(quiz => (
                    <Col sm="4" key={quiz._id} className="mt-3 quiz-toast">

                        <Toast>
                            <ToastHeader className="text-success">

                                <strong>{quiz.title}</strong>
                                <div className="actions text-secondary d-flex">

                                    <img src={trash} alt="" width="16" height="16" className="mr-3 mt-1" onClick={() => deleteQuiz(quiz._id)} />

                                    <EditQuiz qId={quiz._id} qTitle={quiz.title} qDesc={quiz.description} />
                                    
                                    <Link to={`/questions-create/${quiz._id}`} className="text-secondary">
                                                            <img src={AddIcon} alt=""  width="12" height="12" className="" /> <small>Questions</small>
                                                    </Link>

                                </div>

                            </ToastHeader>

                            <ToastBody>
                                {quiz.description}
                                <br />
                                <br />

                                {quiz.questions.length > 0 ? <p className="font-weight-bold">Questions ({quiz.questions.length})</p> : null}

                                {quiz.questions && quiz.questions.map(question =>
                                    <ol key={question._id}>
                                        <li className="">{question.questionText}</li>
                                    </ol>
                                )}

                            </ToastBody>
                        </Toast>

                    </Col>
                ))}
            </Row>

        </TabPane>
    )
}

const mapStateToProps = state => ({
    allQuizes: state.quizesReducer.allQuizes,
    questionsData: state.questionsReducer.questionsData
})

export default connect(mapStateToProps, { setQuizes, setQuestions, setQuestionsLoading, updateQuiz, deleteQuiz })(QuizesTabPane)