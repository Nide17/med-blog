import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { UncontrolledCollapse, Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { setCategories } from '../../redux/categories/categories.actions'

const ViewCategory = ({ allcategories, setCategories }) => {

    // Lifecycle methods
    useEffect(() => {
        setCategories();
    }, [setCategories]);

    return (
        allcategories.slice(0, 5).map(category =>
            <React.Fragment key={category._id}>
                <Button outline color="secondary" id={category.title} block className="px-0 mt-2">{category.title}</Button>

                <UncontrolledCollapse toggler={`#${category.title}`} className="w-100">
                    <ListGroup>
                        {category.quizes.map(quiz =>
                            <ListGroupItem key={quiz._id} className="d-flex justify-content-between">
                                <p className="m-0">{quiz.title}</p>
                                <Badge color="info">{quiz.questions.length}</Badge>
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