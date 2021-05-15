import React, { useEffect } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { setCategories } from '../../redux/categories/categories.actions'
import ReactLoading from "react-loading";

const SimilarQuizes = ({ catID, categories, setCategories }) => {
    console.log(categories)
    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);

    return (
        <>
            {
                categories && categories.isLoading ?
                    <ReactLoading type="bubbles" color="#33FFFC" className="mx-auto" /> :

                    <Row className="similar-quizes mx-3">
                        <h4 className="text-center col-12 mb-4 font-weight-bolder">
                        Similar quizes you may also like to take</h4>

                        {categories && categories.allcategories.map(category =>

                            (category._id === catID) ?

                                category && category.quizes.map(quiz => (

                                    <Col sm="4" key={quiz._id} className="mt-2">
                                        <Card body>
                                            <CardTitle tag="h5">{quiz.title} ({quiz.questions.length})</CardTitle>
                                            <CardText>{quiz.description}</CardText>
                                            <Button color="info">
                                                <Link to={`/view-quiz/${quiz._id}`} className="text-white">
                                                    Attempt
                                                </Link>
                                            </Button>
                                        </Card>
                                    </Col>

                                )).slice(0, 3) : null

                        )}

                    </Row>
            }
        </>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, { setCategories })(SimilarQuizes)