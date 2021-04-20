import React, { useEffect } from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getUsers } from '../../redux/auth/auth.actions'

const PostItem = ({ quiz, getUsers }) => {

    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const { _id, title, description, creation_date, category, created_by, questions } = quiz

    let date = new Date(creation_date);

    return (
        <Card body className="bg-secondary py-0 py-md-3">

            <CardTitle tag="h4" className="mb-0 text-primary">
                <Link to={`/view-quiz/${_id}`}>{title && title}
                    &nbsp;<span className="text-danger">({questions && questions.length})</span>
                </Link>
            </CardTitle>

            <div className="small-text d-md-flex justify">
                <p className="mr-5 my-1 text-dark">{date.toDateString()}</p>
                <p className="mr-5 my-1 text-dark">-{category && category.title}
                    <small>&nbsp;({created_by && created_by.name})</small>
                </p>
            </div>

            <CardText className="mt-3 text-secondary">{description && description}</CardText>
        </Card>
    )
}
const mapStateToProps = state => ({
    postsData: state.postsReducer.postsData,
    users: state.authReducer.users
})

export default connect(mapStateToProps, { getUsers })(PostItem)