import React, { useState } from 'react'
import { Row, Col, Button, Toast, ToastBody, ToastHeader, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux'

import CreateCategory from '../categories/CreateCategory';
import CategoriesTabPane from '../categories/CategoriesTabPane';
import QuizesTabPane from '../quizes/QuizesTabPane';
import SubscribersTabPane from './SubscribersTabPane';


const Webmaster = ({ auth }) => {

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
                                    Quizes
                            </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}>
                                    Subscribers
                            </NavLink>
                            </NavItem>

                        </Nav>
                    </Col>

                    <Col sm="12">

                        <TabContent activeTab={activeTab}>

                            <CategoriesTabPane />
                            <SubscribersTabPane />
                            <QuizesTabPane />

                        </TabContent>
                    </Col>
                </Row>
            </> :

            <h3 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Access denied! Login first</h3>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, null)(Webmaster)