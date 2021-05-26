import React, { useState } from 'react'
import ReactLoading from "react-loading";
import { Row, Col, Button, Toast, ToastBody, ToastHeader, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import CreateCategory from '../categories/CreateCategory';
import CategoriesTabPane from '../categories/CategoriesTabPane';
import QuizesTabPane from '../quizes/QuizesTabPane';
import SubscribersTabPane from './SubscribersTabPane';
import UsersTabPane from '../users/UsersTabPane';
import Reports from './Reports';
import LoginModal from '../auth/LoginModal'
import ContactsTabPane from '../contacts/ContactsTabPane';
import ScoresTabPane from './ScoresTabPane';

const Webmaster = ({ auth }) => {
    // State
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // render
    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?
                <>
                    <Row className="m-4 d-flex justify-content-between align-items-start text-primary">
                        <Toast>
                            <ToastHeader>
                                <strong>Welcome to your webmaster page</strong>
                            </ToastHeader>

                            <ToastBody>
                                Here you can add, edit and remove features!
                        </ToastBody>
                        </Toast>

                        {auth.user.role === 'Admin' ?
                            <div className="master-btns">
                                <Button size="sm" outline color="secondary">
                                    <CreateCategory />
                                </Button>
                            </div> :
                            null}

                    </Row>

                    <Row className="m-4">
                        <Col sm="12" className="px-0">

                            <Nav tabs className="d-block d-sm-flex">

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
                                        Quizes
                                    </NavLink>
                                </NavItem>

                                {
                                    auth.user.role === 'Admin' ?
                                        <>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '3' })}
                                                    onClick={() => { toggle('3'); }}>
                                                    Subscribers
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '4' })}
                                                    onClick={() => { toggle('4'); }}>
                                                    Users
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '5' })}
                                                    onClick={() => { toggle('5'); }}>
                                                    Contacts
                                                </NavLink>
                                            </NavItem>

                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === '6' })}
                                                    onClick={() => { toggle('6'); }}>
                                                    All scores
                                                </NavLink>
                                            </NavItem>

                                        </> : null
                                }

                            </Nav>
                        </Col>

                        <Col sm="12" className="px-0">
                            <TabContent activeTab={activeTab}>
                                <CategoriesTabPane currentUser={auth.user} />
                                <QuizesTabPane currentUser={auth.user} />
                                <SubscribersTabPane />
                                <UsersTabPane />
                                <ContactsTabPane currentUser={auth.user} />
                                <ScoresTabPane auth={auth} />
                            </TabContent>
                        </Col>

                    </Row>
                </> :
                <Reports userId={auth.user._id} /> :

            // If not authenticated or loading
            <div className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

Webmaster.propTypes = {
    auth: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps, {})(Webmaster)