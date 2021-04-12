import React, { useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import EditUser from './EditUser';

import { getUsers, deleteUser, updateUser } from '../../redux/auth/auth.actions'

import trash from '../../images/trash.svg';

const UsersTabPane = ({ users, getUsers, deleteUser }) => {

    // Lifecycle methods
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (

        <TabPane tabId="4">
            <Row>
                {users && users.map(user => (
                    <Col sm="4" key={user._id} className="mt-3 users-toast">

                        <Toast>
                            <ToastHeader className="text-success">

                                <strong>{user.email}</strong>
                                <div className="actions text-secondary d-flex">
                                    <img src={trash} alt="" width="16" height="16" className="mx-4 mt-1" onClick={() => deleteUser(user._id)} />
                                    <EditUser uId={user._id} uName={user.name} uRole={user.role} uEmail={user.email}/>
                                </div>
                            </ToastHeader>

                            <ToastBody>
                                <p className="font-weight-bold">{user.name}</p>
                                <p>{user.role}</p>
                            </ToastBody>
                        </Toast>

                    </Col>
                ))}
            </Row>

        </TabPane>
    )
}

const mapStateToProps = state => ({
    users: state.authReducer.users
})

export default connect(mapStateToProps, { getUsers, updateUser, deleteUser })(UsersTabPane)