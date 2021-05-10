import React, { useEffect } from 'react';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { Row, Col, Button, Toast, ToastBody, ToastHeader, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setCategories } from '../../redux/categories/categories.actions'
import { setQuizes } from '../../redux/quizes/quizes.actions'

import AddIcon from '../../images/plus.svg';


const SingleCategory = ({ auth, setCategories, setQuizes, quizes, allcategories }) => {

    // Lifecycle methods
    useEffect(() => {
        setCategories();
        setQuizes();
    }, [setCategories, setQuizes]);

    // Access route parameters
    const { categoryId } = useParams()

    return (
        auth.isAuthenticated ?

            <>
                {allcategories && allcategories.map(category => (

                    (category._id === categoryId) ?

                        <div className="mt-2 mt-lg-5 mx-3 mx-lg-5 single-category" key={category._id}>

                            <Row key={category._id} className="mb-0 mb-lg-3 mx-0">
                                <Breadcrumb>
                                    <BreadcrumbItem>
                                        <Link to="/webmaster">{category.title}</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>Quizes</BreadcrumbItem>
                                </Breadcrumb>
                            </Row>

                            <small className="ml-2">
                                <i className="text-success text-left text-capitalize">
                                    "{category.description}"
                                </i>
                            </small>

                            <Row className="mx-0 mt-4 m-lg-4 d-flex justify-content-between align-items-center text-primary">

                                {category.quizes.map(quiz => (
                                    <Col sm="4" className="mt-2 px-2" key={quiz._id}>

                                        <Toast className="text-center">
                                            <ToastHeader className="d-flex justify-content-between">
                                                {quiz.title}
                                            </ToastHeader>
                                            <ToastBody>

                                                {quizes && quizes.allQuizes.map(qz =>
                                                    qz._id === quiz._id ?
                                                        <p key={qz._id} className="text-dark">Number of questions: {qz.questions.length}</p>
                                                        : null)}

                                                {auth.user._id === quiz.created_by ?
                                                    <p>
                                                        <Link to={`/questions-create/${quiz._id}`} className="text-success">
                                                            <Button size="sm" outline color="warning" className="p-1">
                                                                <img src={AddIcon} alt="" width="10" height="10" className="" />&nbsp;Add Questions
                                                            </Button>
                                                        </Link>
                                                    </p> :
                                                    null}

                                                <small>Created on {quiz.creation_date.split('T').slice(0, 1)}</small>
                                            </ToastBody>
                                        </Toast>

                                    </Col>))}

                            </Row>
                        </div> :
                        null
                ))}

            </> :

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

const mapStateToProps = state => ({
    auth: state.authReducer,
    quizes: state.quizesReducer,
    allcategories: state.categoriesReducer.allcategories
});

export default connect(mapStateToProps, { setQuizes, setCategories })(SingleCategory);