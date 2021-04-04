import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setCategories } from '../../redux/categories/categories.actions'
import { Row, Col } from 'reactstrap';

const SingleCategory = ({ auth, setCategories, allcategories }) => {

    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);

    console.log(allcategories);

    // Access route parameters
    const { categoryId } = useParams()

    return (
        auth.isAuthenticated ?

            <Row>
                {allcategories && allcategories.map(category => (

                    (category._id === categoryId) ?

                        <Col sm="6" className="mt-2" key={category._id}>
                            <div className="mt-5 mx-5">
                                <h1>
                                    {category.title}
                                </h1>

                                <p>{category.description}</p>
                                <small>Number of Quizes{category.quizes.length}</small>
                            </div>

                        </Col> :
                        null
                ))}

            </Row> :

            <h3 className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">Access denied! Login first</h3>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    allcategories: state.categoriesReducer.allcategories
});

export default connect(mapStateToProps, { setCategories })(SingleCategory);
