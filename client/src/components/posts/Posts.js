import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import PostItem from './PostItem'

import { connect } from 'react-redux'
import { setPosts, subscribeToNewsLetter } from '../../redux/posts/posts.actions'
import { clearErrors } from '../../redux/error/error.actions'

const Posts = ({ postsData, setPosts, subscribeToNewsLetter, error, subscribedUsers, clearErrors }) => {

    const [state, setState] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {

        // Inside this callback function, we set posts when the component is mounted.
        setPosts();
    }, [setPosts]);

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
            <Row>
                <Col sm="9" className="mt-md-2">
                    {postsData && postsData.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </Col>

                <Col sm="3">
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
                            <h6 className="mt-4"><b>Subscribe to our newsletter.</b></h6>
                            <Input type="text" name="name" bsSize="sm" placeholder="Your name" className="mt-4" onChange={onChangeHandler} required />
                            <Input type="email" name="email" bsSize="sm" placeholder="Your Email" className="mt-4" onChange={onChangeHandler} required />
                            <Button color="info" size="sm" className="mt-4">Signup</Button>
                        </FormGroup>
                    </Form>
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    postsData: state.postsReducer.postsData,
    error: state.errorReducer,
    subscribedUsers: state.postsReducer.subscribedUsers
})

export default connect(mapStateToProps, { setPosts, subscribeToNewsLetter, clearErrors })(Posts)