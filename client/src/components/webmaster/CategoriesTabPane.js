import React, { useEffect } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { setCategories, deleteCategory } from '../../redux/categories/categories.actions'

import AddQuiz from '../quizes/AddQuiz';
import EditCategory from './EditCategory';
import DeleteIcon from '../../images/remove.svg';

const CategoriesTabPane = ({categories, setCategories, deleteCategory }) => {

    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);


    return (
        <TabPane tabId="1">

            <Row>
                {categories.allcategories && categories.allcategories.map(category => (
                    <Col sm="6" className="mt-2" key={category._id}>

                        <Card body>

                            <CardTitle>
                                <Link to={`/quiz/${category._id}`} className="text-success">
                                    {category.title} Quizes ({category.quizes.length})
                            </Link>
                            </CardTitle>

                            <CardText>{category.description}</CardText>

                            <div className="actions ml-3">

                                <Button size="sm" outline color="info" className="mx-2">
                                    <strong><AddQuiz category={category} /></strong>
                                </Button>

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
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, { setCategories, deleteCategory })(CategoriesTabPane)