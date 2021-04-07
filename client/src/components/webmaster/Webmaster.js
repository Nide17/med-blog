import React, { useState, useEffect, Fragment } from 'react'
import { Row, Col, Button, Toast, ToastBody, ToastHeader, TabContent, Nav, NavItem, NavLink, Alert } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import CreateCategory from '../categories/CreateCategory';
import CategoriesTabPane from '../categories/CategoriesTabPane';
import QuizesTabPane from '../quizes/QuizesTabPane';
import SubscribersTabPane from './SubscribersTabPane';

const Webmaster = ({ auth, error }) => {

    // State
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    // Errors on form
    const [errorsStateAPI, setErrorsStateAPI] = useState([])

    useEffect(() => {
        if (error.id !== null) {
            setErrorsStateAPI(errorsStateAPI => [...errorsStateAPI, error.msg && error.msg.msg]);
        }
    }, [error])

    // render
    return (
        auth.isAuthenticated ?
            <>
                {/* Title */}
                <Row className="m-4 d-flex justify-content-between align-items-start text-primary">
                    <Toast>
                        <ToastHeader>
                            <strong>Welcome to your webmaster page</strong>
                        </ToastHeader>

                        <ToastBody>
                            Here you can add, edit and remove features!
                        </ToastBody>
                    </Toast>

                    <div className="d-flex flex-column">
                        {errorsStateAPI.length > 0 ?
                            errorsStateAPI.map(err =>
                                <Alert color="danger" isOpen={visible} toggle={onDismiss} key={Math.floor(Math.random() * 1000)}>
                                    {err}
                                </Alert>)
                            :
                            null
                        }
                    </div>

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

            <h6 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Login Again!</h6>
    )
}
Webmaster.propTypes = {
    auth: PropTypes.object,
    error: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    error: state.errorReducer
});

export default connect(mapStateToProps, {})(Webmaster)