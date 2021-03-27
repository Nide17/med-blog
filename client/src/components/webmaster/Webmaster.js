import React, { useEffect } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, Toast, ToastBody, ToastHeader } from 'reactstrap';

import { connect } from 'react-redux'
import { setSubscribers } from '../../redux/posts/posts.actions'

const Webmaster = ({ auth, subscribedUsers, setSubscribers }) => {

    useEffect(() => {
        setSubscribers();
    }, [setSubscribers]);

    return (
        auth.isAuthenticated ?
            <>
                <Row className="m-4 d-flex justify-content-center align-items-center text-primary">
                    <Toast>
                        <ToastHeader>
                            Welcome
                    </ToastHeader>

                        <ToastBody>
                            <strong>{auth.user.name}</strong>
                        </ToastBody>
                    </Toast>
                </Row>

                <Row className="m-4">
                    {subscribedUsers && subscribedUsers.map(subscribedUser => (
                        <Col sm="3" key={subscribedUser._id} className="mt-3">
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                <CardTitle tag="p">{subscribedUser.name.split(' ').slice(0, 2).join(' ')}</CardTitle>
                                <CardText>
                                    <small>Email: {subscribedUser.email}</small>
                                </CardText>
                                <Button>
                                    <small><i>On {subscribedUser.subscription_date.split('T').slice(0, 2).join(' at ')}</i></small>
                                </Button>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </> :

            <h1 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Access denied! Login first</h1>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    subscribedUsers: state.postsReducer.subscribedUsers
})


export default connect(mapStateToProps, { setSubscribers })(Webmaster)