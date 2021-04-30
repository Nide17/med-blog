import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Button, Alert, Spinner } from 'reactstrap';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { setPosts, subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import { clearErrors } from '../../redux/error/error.actions'
const PostItem = lazy(() => import('./PostItem'));
const ViewCategory = lazy(() => import('../categories/ViewCategory'));

const Posts = ({ setPosts, subscribeToNewsLetter, subscribedUsers, clearErrors, error, setQuizes, allQuizes }) => {

    const [state, setState] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        // Inside this callback function, we set posts when the component is mounted.
        setPosts();
        setQuizes()
    }, [setPosts, setQuizes]);

    const onChangeHandler = e => {
        clearErrors();
        const { name, value } = e.target
        setState(state => ({ ...state, [name]: value }))
    };

    const onSubscribe = e => {
        e.preventDefault();

        const { name, email } = state;

        // Create user object
        const subscribedUser = {
            name,
            email
        };

        // Attempt to subscribe
        subscribeToNewsLetter(subscribedUser);
    }

    return (
        <Container className="posts main mt-4">

            <blockquote className="blockquote text-center mt-4">
                <h1 className="mb-0 lead text-uppercase font-weight-bold">Knowing matter, so does quizzing!</h1>
                <small className="text-muted">Welcome, test out your wishes!</small>
            </blockquote>

            <Row className="mt-lg-5">
                <Col sm="8" className="mt-md-2">
                    <Suspense
                        fallback={
                            <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                <Spinner style={{ width: '5rem', height: '5rem' }} />
                            </div>
                        }>
                        <h3 className="mb-3 text-center lead font-weight-bold">Newest Quizes</h3>
                        {allQuizes && allQuizes.slice(0, 20).map(quiz => (
                            quiz.questions.length > 0 ?
                                <PostItem key={quiz._id} quiz={quiz} /> : null

                        ))}

                        {allQuizes.length > 0 ? <div className="mt-4 d-flex justify-content-center">
                            <Link to="/allposts">
                                <Button outline color="info">Load more ...</Button>
                            </Link>
                        </div> : null}

                    </Suspense>

                </Col>

                <Col sm="4">
                    <Row className="mb-5">
                        <Suspense
                            fallback=
                            {
                                <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                    <Spinner style={{ width: '5rem', height: '5rem' }} />{' '}
                                </div>
                            }>
                            <ViewCategory />

                        </Suspense>
                    </Row>

                    <Row className="mb-5">
                        {error.id === "SUBSCRIBE_FAIL" ?
                            <Alert color='danger'>
                                <small>{error.msg.msg}</small>
                            </Alert> :
                            subscribedUsers[1] !== undefined ?
                                <Alert color='success'>
                                    <small>{subscribedUsers[1].msg}</small>
                                </Alert> :
                                null
                        }

                        <Form onSubmit={onSubscribe}>
                            <FormGroup>
                                <h6 className="mt-4">
                                    <b>Subscribe to our newsletter.</b>
                                </h6>

                                <Input type="text" name="name" bsSize="sm" placeholder="Your name" className="mt-4" onChange={onChangeHandler} minLength="4" maxLength="30" required />

                                <Input type="email" name="email" bsSize="sm" placeholder="Your Email" className="mt-4" onChange={onChangeHandler} required />

                                <Button color="info" size="sm" className="mt-4">Subscribe</Button>
                            </FormGroup>
                        </Form>
                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    postsData: state.postsReducer.postsData,
    error: state.errorReducer,
    subscribedUsers: state.postsReducer.subscribedUsers,
    allQuizes: state.quizesReducer.allQuizes,
    questionsData: state.questionsReducer.questionsData,
})

export default connect(mapStateToProps, { setPosts, subscribeToNewsLetter, clearErrors, setQuizes })(Posts)