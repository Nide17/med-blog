import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, Toast, ToastBody, ToastHeader, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import { connect } from 'react-redux'
import { setSubscribers } from '../../redux/posts/posts.actions'
import { setCategories } from '../../redux/categories/categories.actions'
import CreateCategory from './CreateCategory';

const Webmaster = ({ auth, subscribedUsers, setSubscribers, categories, setCategories }) => {

    // Lifecycle methods
    useEffect(() => {
        setSubscribers();
        setCategories();
    }, [setSubscribers, setCategories]);

    // State
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // render
    return (
        auth.isAuthenticated ?
            <>
                {/* Title */}
                <Row className="m-4 d-flex justify-content-between align-items-center text-primary">
                    <Toast>
                        <ToastHeader>
                            <strong>{auth.user.name}</strong>
                        </ToastHeader>

                        <ToastBody>
                            Welcome to your webmaster page
                        </ToastBody>
                    </Toast>

                    <div className="master-btns">
                        <Button size="sm" outline color="secondary"><CreateCategory /></Button>
                    </div>

                </Row>

                <Row className="m-4">
                    <Nav tabs>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>
                                Subscribers
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>
                                Categories
                            </NavLink>
                        </NavItem>

                    </Nav>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">

                            <Row>
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

                        </TabPane>

                        <TabPane tabId="2">

                            <Row>
                            {categories.allcategories && categories.allcategories.map(category => (
                                <Col sm="6">
                                    <Card body className="mt-2">
                                        <CardTitle className="text-success">{category.title}</CardTitle>
                                        <CardText>{category.description}</CardText>
                                        <Button>Edit</Button>
                                    </Card>
                                </Col>
                            ))}
                            </Row>

                        </TabPane>

                    </TabContent>
                </Row>
            </> :

            <h1 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Access denied! Login first</h1>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    subscribedUsers: state.postsReducer.subscribedUsers,
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, { setSubscribers, setCategories })(Webmaster)