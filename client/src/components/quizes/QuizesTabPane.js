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
                    <Col sm="4" key={quiz._id} className="mt-3 quiz-toast">

                        <Toast>
                            <ToastHeader className="text-success">
                                <strong>{quiz.title}</strong>
                            </ToastHeader>

                            <ToastBody>
                                {quiz.description}
                                <br />
                                <br />
                                <p className="font-weight-bold">Questions</p>

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

export default connect(mapStateToProps, { setQuizes, setQuestions, setQuestionsLoading })(QuizesTabPane)