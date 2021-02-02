import React, { useEffect } from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap';
import PostItem from './PostItem'

import { connect } from 'react-redux'
import { setPosts } from '../redux/posts/posts.actions'

const Posts = props => {

    useEffect(() => {
        // Inside this callback function, we set posts when the component is mounted.
        props.setPosts();
    });

    const { postsData } = props

    return (
        <Container className="posts mt-4">
            <Row>
                <Col sm="9" className="mt-md-2">
                    {postsData && postsData.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </Col>

                <Col sm="3">
                    <Form>
                        <FormGroup>
                            <h5 className="mt-4">Subscribe to our newsletter.</h5>
                            <Input type="text" name="name" bsSize="sm" placeholder="Your name" className="mt-4" />
                            <Input type="email" name="email" bsSize="sm" placeholder="Your Email" className="mt-4" />
                            <Button color="info" size="sm" className="mt-4">Signup</Button>{' '}
                        </FormGroup>
                    </Form>
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    postsData: state.postsReducer.postsData
})

const mapDispatchToProps = (dispatch) => ({
    setPosts: () => dispatch(setPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
