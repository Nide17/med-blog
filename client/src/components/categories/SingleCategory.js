import React, { useEffect } from 'react';
import { Row, Col, Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setCategories } from '../../redux/categories/categories.actions'
import AddIcon from '../../images/plus.svg';


const SingleCategory = ({ auth, setCategories, allcategories }) => {

    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);

    // Access route parameters
    const { categoryId } = useParams()

    return (
        auth.isAuthenticated ?

            <>
                {allcategories && allcategories.map(category => (

                    (category._id === categoryId) ?

                        <div className="mt-5 mx-5 text-center single-category" key={category._id}>

                            <h1>{category.title}</h1>
                            <small><i className="text-success">"{category.description}"</i></small>

                            <Row className="m-4 d-flex justify-content-between align-items-center text-primary">

                                {category.quizes.map(quiz => (
                                    <Col sm="4" className="mt-2" key={quiz._id}>
                                        <Toast className="text-center">
                                            <ToastHeader className="d-flex justify-content-between">
                                                {quiz.title}

                                                <Link to={`/questions-create/${quiz._id}`} className="text-success">
                                                    <Button size="sm" outline color="warning" className="ml-5 p-1">
                                                        <img src={AddIcon} alt="" width="10" height="10" className="" />
                                                    </Button>
                                                </Link>

                                            </ToastHeader>
                                            <ToastBody>
                                                <p>{quiz.description}</p> <br />

                                                <p className="text-dark">Number of questions: {quiz.questions.length}</p>
                                                <small>Created on {quiz.creation_date.split('T').slice(0, 1)}</small>
                                            </ToastBody>
                                        </Toast>
                                    </Col>))}

                            </Row>
                        </div> :
                        null
                ))}

            </> :

            <h6 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Login Again!</h6>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    allcategories: state.categoriesReducer.allcategories
});

export default connect(mapStateToProps, { setCategories })(SingleCategory);