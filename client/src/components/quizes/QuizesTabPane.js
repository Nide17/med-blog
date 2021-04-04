import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'

const QuizesTabPane = ({ allQuizes, setQuizes }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
    }, [setQuizes]);

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
                            </ToastBody>
                        </Toast>

                    </Col>
                ))}
            </Row>

        </TabPane>
    )
}

const mapStateToProps = state => ({
    allQuizes: state.quizesReducer.allQuizes
})

export default connect(mapStateToProps, { setQuizes })(QuizesTabPane)
