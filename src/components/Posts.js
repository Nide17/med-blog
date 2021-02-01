import React from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap';
import PostItem from './PostItem'
import postsData from './postsData'

const Posts = () => {

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
                            <Input type="text" name="name" bsSize="sm" placeholder="Your name"  className="mt-4" />
                            <Input type="email" name="email" bsSize="sm" placeholder="Your Email" className="mt-4" />
                            <Button color="info" size="sm" className="mt-4">Signup</Button>{' '}
                        </FormGroup>
                    </Form>
                </Col>

            </Row>
        </Container>
    )
}

export default Posts
