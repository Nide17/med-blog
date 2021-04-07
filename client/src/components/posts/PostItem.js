import React, {useEffect} from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getUsers } from '../../redux/auth/auth.actions'

const PostItem = ({quiz, getUsers, users}) => {

    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const { _id, title, description, creation_date, category, created_by, questions } = quiz

    let date = new Date(creation_date);

    const author = users && users.map(user =>
        user._id === created_by ? user.name : null)

    return (
        <Card body className="bg-secondary py-0 py-md-3">

            <CardTitle tag="h4" className="mb-0 text-primary">
                <Link to={`/view-quiz/${_id}`}>{title} ({questions && questions.length})</Link>
            </CardTitle>

            <div className="small-text d-md-flex justify">
                <p className="mr-5 my-1 text-danger">{date.toDateString()}</p>
                <p className="mr-5 my-1 text-danger">-{category.title}</p>
                <p className="mr-5 my-1 text-danger">-{author && author[1]}</p>
            </div>

            <CardText className="mt-3">{description}</CardText>
            {/* <div className="tags d-flex">
                {Keywords && Keywords.map(keyword => (
                    <p className="px-2 mr-2" key={keyword}># {keyword}</p>
                ))}

            </div> */}
        </Card>
    )
}
const mapStateToProps = state => ({
    postsData: state.postsReducer.postsData,
    users: state.authReducer.users
})

export default connect(mapStateToProps, { getUsers})(PostItem)