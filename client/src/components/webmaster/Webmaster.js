import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, Toast, ToastBody, ToastHeader, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { setSubscribers } from '../../redux/posts/posts.actions'
import { setCategories, deleteCategory } from '../../redux/categories/categories.actions'
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';
import DeleteIcon from '../../images/remove.svg';
import AddIcon from '../../images/plus.svg';

const Webmaster = ({ auth, subscribedUsers, setSubscribers, categories, setCategories, deleteCategory }) => {

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
                            <strong>Welcome to your webmaster page</strong>
                        </ToastHeader>

                        <ToastBody>
                            Here you can add, edit and remove features!
                        </ToastBody>
                    </Toast>

                    <div className="master-btns">
                        <Button size="sm" outline color="secondary">
                            <CreateCategory />
                        </Button>
                    </div>

                </Row>

                <Row className="m-4">
                    <Col sm="12">

                        <Nav tabs>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}>
                                    Categories
                            </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}>
                                    Subscribers
                            </NavLink>
                            </NavItem>

                        </Nav>
                    </Col>

                    <Col sm="12">

                        <TabContent activeTab={activeTab}>

                            <TabPane tabId="1">

                                <Row>
                                    {categories.allcategories && categories.allcategories.map(category => (
                                        <Col sm="6" className="mt-2" key={category._id}>

                                            <Card body>
                                                <CardTitle className="text-success">{category.title} Quizes (number)</CardTitle>
                                                <CardText>{category.description}</CardText>

                                                <div className="actions ml-3">

                                                    {/* Flaticons */}
                                                    <Link to={`/create-quiz/${category._id}`}>
                                                        <Button size="sm" outline color="info" className="mx-2">
                                                            <img src={AddIcon} alt="" width="10" height="10" /><strong>&nbsp;&nbsp;New quiz</strong>
                                                        </Button>
                                                    </Link>

                                                    <Button size="sm" color="link" className="mx-2">
                                                        <EditCategory idToUpdate={category._id} editTitle={category.title} editingCategory={category.description} />
                                                    </Button>

                                                    <Button size="sm" color="link" className="mx-2" onClick={() => deleteCategory(category._id)}>
                                                        <img src={DeleteIcon} alt="" width="16" height="16" />
                                                    </Button>

                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>

                            </TabPane>

                            <TabPane tabId="2">

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

                        </TabContent>
                    </Col>
                </Row>
            </> :

            <h3 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Access denied! Login first</h3>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    subscribedUsers: state.postsReducer.subscribedUsers,
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, { setSubscribers, setCategories, deleteCategory })(Webmaster)