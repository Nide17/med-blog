import React, { useEffect, lazy, Suspense } from 'react'
import { Container, Col, Row, Spinner } from 'reactstrap';

import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setPosts, subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
const PostItem = lazy(() => import('./PostItem'));

const Posts = ({ setPosts, setQuizes, allQuizes }) => {

    useEffect(() => {
        // Inside this callback function, we set posts when the component is mounted.
        setPosts();
        setQuizes()
    }, [setPosts, setQuizes]);

    return (
        <Container className="posts main mt-4">

            <blockquote className="blockquote text-center mt-4">
                <h1 className="mb-0 lead text-uppercase font-weight-bold">Knowing matter, so does quizzing!</h1>
                <small className="text-muted">Welcome, test out your wishes!</small>
            </blockquote>

            <Row className="mt-lg-5">
            <Col sm="2" className="mt-md-2"></Col>
                <Col sm="8" className="mt-md-2">
                    <Suspense
                        fallback={
                            <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                <Spinner style={{ width: '5rem', height: '5rem' }} />
                            </div>
                        }>
                        <h3 className="mb-3 text-center lead font-weight-bold">Newest Quizes</h3>
                        {allQuizes && allQuizes.map(quiz => (
                            <PostItem key={quiz._id} quiz={quiz} />
                        ))}
                    </Suspense>
                </Col>
                <Col sm="2" className="mt-md-2"></Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    allQuizes: state.quizesReducer.allQuizes,
})

export default connect(mapStateToProps, { setPosts, subscribeToNewsLetter, setQuizes })(Posts)