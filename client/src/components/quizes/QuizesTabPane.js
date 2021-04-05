import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'

const QuizesTabPane = ({ allQuizes, setQuizes, setQuestions, questionsData }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
        setQuestions();
    }, [setQuizes, setQuestions]);

    return (

        <TabPane tabId="2">
            <Row>
                {allQuizes && allQuizes.map(quiz => (
                    <Col sm="4" key={quiz._id} className="mt-3">
                        <Toast>
                            <ToastHeader className="text-success">
                                <strong>{quiz.title}</strong>
                            </ToastHeader>

                            <ToastBody>
                                {quiz.description}
                                <br />
                                <br />
                                <p className="font-weight-bold">Questions</p>

                                {questionsData && questionsData.map(q =>

                                    q.quiz === quiz._id ?
                                        <ol>
                                            <li className="">{q.questionText}</li>
                                        </ol> :
                                        null

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

export default connect(mapStateToProps, { setQuizes, setQuestions, setQuestionsLoading })(QuizesTabPane)