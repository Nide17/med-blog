import React, { useEffect } from 'react'
import { Row, TabPane, Table, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { setScores, deleteScore } from '../../redux/scores/scores.actions'
import ReactLoading from "react-loading";

import trash from '../../images/trash.svg';

const ScoresTabPane = ({ scores, setScores, deleteScore }) => {

    // Lifecycle methods
    useEffect(() => {
        setScores();
    }, [setScores]);

    return (

        <TabPane tabId="6">
            {
                scores.isLoading ?
                    <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                    <Row>

                        <Table size="sm" className="all-scores" hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Taker</th>
                                    <th>Quiz</th>
                                    <th>Category</th>
                                    <th>Marks</th>
                                    <th>Out of</th>
                                    <th><img src={trash} alt="" width="16" height="16" /></th>
                                </tr>
                            </thead>

                            <tbody>

                                {scores && scores.allScores.map((score, index) => (
                                    <tr key={score._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{score.test_date.split('T').slice(0, 1)}</td>
                                        <td>{score.taken_by && score.taken_by.name}</td>
                                        <td>{score.quiz && score.quiz.title}</td>
                                        <td>{score.category && score.category.title}</td>
                                        <td className={score.out_of / 2 > score.marks ? "font-weight-bold text-danger" : "text-success"}>
                                            {score.marks}
                                        </td>
                                        <td className={score.out_of / 2 > score.marks ? "font-weight-bold text-danger" : "text-success"}>
                                            {score.out_of}
                                        </td>
                                        <td>
                                            <Button size="sm" color="link" className="mt-0 p-0" onClick={() => deleteScore(score._id)}>
                                                <img src={trash} alt="" width="16" height="16" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    scores: state.scoresReducer
})

export default connect(mapStateToProps, { setScores, deleteScore })(ScoresTabPane)