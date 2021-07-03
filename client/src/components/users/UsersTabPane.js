import React, { useState, useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane, Button } from 'reactstrap';
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import EditUser from './EditUser';

import { getUsers, deleteUser } from '../../redux/auth/auth.actions'
import trash from '../../images/trash.svg';

const UsersTabPane = ({ users, getUsers, deleteUser }) => {

    const [limit] = useState(8);
    const [skip, setSkip] = useState(0);

    const nextPage = () => {
        setSkip(skip + limit)
    }

    const previousPage = () => {
        setSkip(skip - limit)
    }

    // Lifecycle methods
    useEffect(() => {
        getUsers(limit, skip);
    }, [getUsers, limit, skip]);

    return (

        <TabPane tabId="4">
            {
                users.isLoading ?
                    <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                    <Row>
                        {users && users.users.map(user => (
                            <Col sm="3" key={user._id} className="mt-3 users-toast">

                                <Toast>
                                    <ToastHeader className="text-success overflow-auto">

                                        <strong>{user.email}</strong>
                                        <div className="actions text-secondary d-flex">
                                            <img src={trash} alt="" width="16" height="16" className="mx-4 mt-1" onClick={() => deleteUser(user._id)} />
                                            <EditUser uId={user._id} uName={user.name} uRole={user.role} uEmail={user.email} />
                                        </div>
                                    </ToastHeader>

                                    <ToastBody>
                                        <p className="font-weight-bold">{user.name}</p>
                                        <p>{user.role}</p>
                                        <small className="text-center text-info">
                                            <i>Registered on {user.register_date.split('T').slice(0, 2).join(' at ')}</i>
                                        </small>
                                    </ToastBody>
                                </Toast>

                            </Col>
                        ))}

                        <div className="w-100 d-flex justify-content-around mx-auto mt-5">
                            <Button color="info" onClick={previousPage} className={skip < 1 ? `invisible` : `visible`}>
                                Previous Page
                            </Button>
                            <Button color="info" onClick={nextPage} className={users.users.length < limit ? `invisible` : `visible`}>
                                Next Page
                            </Button>
                        </div>
                    </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    users: state.authReducer
})

export default connect(mapStateToProps, { getUsers, deleteUser })(UsersTabPane)