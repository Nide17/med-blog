import React, { useEffect } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { setSubscribers } from '../../redux/posts/posts.actions'

const SubscribersTabPane = ({ subscribedUsers, setSubscribers, }) => {

    // Lifecycle methods
    useEffect(() => {
        setSubscribers();
    }, [setSubscribers]);

    return (

        <TabPane tabId="3">

            <Row>
                {subscribedUsers && subscribedUsers.map(subscribedUser => (
                    <Col sm="3" key={subscribedUser.email} className="mt-3">

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

        </TabPane>
    )
}

const mapStateToProps = state => ({
    subscribedUsers: state.postsReducer.subscribedUsers
})

export default connect(mapStateToProps, { setSubscribers })(SubscribersTabPane)