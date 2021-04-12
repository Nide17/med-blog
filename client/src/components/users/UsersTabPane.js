import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// import EditUser from './EditUser';

import { setUsers, deleteUser, updateUser } from '../../redux/users/users.actions'

// import trash from '../../images/trash.svg';

const UsersTabPane = ({ allUsers, setUsers, deleteUser }) => {

    // Lifecycle methods
    useEffect(() => {
        setUsers();
    }, [setUsers]);

    return (

        <TabPane tabId="2">
            <Row>
                {allUsers && allUsers.map(user => (
                    <Col sm="4" key={user._id} className="mt-3 quiz-toast">

                        <Toast>
                            <ToastHeader className="text-success">

                                <strong>{user.title}</strong>
                                <div className="actions text-secondary d-flex">

                                    {/* <img src={trash} alt="" width="16" height="16" className="mr-3 mt-1" onClick={() => deleteUser(user._id)} />

                                    <EditUser uId={user._id} qTitle={user.title} qDesc={user.description} />
                                    
                                    <Link to={`/questions-create/${user._id}`} className="text-secondary">
                                                            <img src={AddIcon} alt=""  width="12" height="12" className="" /> <small>Questions</small>
                                                    </Link> */}

                                </div>

                            </ToastHeader>

                            <ToastBody>
                                {user.description}
                                <br />
                                <br />

                                {user.questions.length > 0 ? <p className="font-weight-bold">Questions ({user.questions.length})</p> : null}

                                {user.questions && user.questions.map(question =>
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
    allUsers: state.usersReducer.allUsers
})

export default connect(mapStateToProps, { setUsers, updateUser, deleteUser })(UsersTabPane)