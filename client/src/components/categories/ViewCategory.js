import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { UncontrolledCollapse, Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { setCategories } from '../../redux/categories/categories.actions'

const ViewCategory = ({ allcategories, setCategories }) => {

    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);

    return (
        allcategories.slice(0, 10).map(category =>
            <React.Fragment key={category._id}>
                <Button outline color="secondary" id={category.title.split(' ').join('-')} block className="px-0 mt-2 text-capitalize">
                    {category.title}
                </Button>

                <UncontrolledCollapse toggler={`#${category.title.split(' ').join('-')}`} className="w-100">
                    <ListGroup>
                        {category.quizes.map(quiz =>
                            <ListGroupItem key={quiz._id} className="d-flex justify-content-between">
                                <Link to={`/view-quiz/${quiz._id}`} className="m-0 text-capitalize">
                                    {quiz.title}
                                </Link>
                                <Badge color="info" className="ml-lg-2">{quiz.questions.length > 30 ? '30+' : quiz.questions.length}</Badge>
                            </ListGroupItem>
                        )}

                    </ListGroup>
                </UncontrolledCollapse>
            </React.Fragment>
        )
    );
}

const mapStateToProps = state => ({
    allcategories: state.categoriesReducer.allcategories
})

export default connect(mapStateToProps, { setCategories })(ViewCategory);