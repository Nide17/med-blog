import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Button, Alert, Spinner } from 'reactstrap';
import SearchInput from '../SearchInput'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import { clearErrors } from '../../redux/error/error.actions'
const PostItem = lazy(() => import('./PostItem'));
const ViewCategory = lazy(() => import('../categories/ViewCategory'));

const Posts = ({ subscribeToNewsLetter, subscribedUsers, clearErrors, error, setQuizes, allQuizes }) => {

    const [subscriberState, setsubscriberState] = useState({
        name: '',
        email: ''
    })

    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        // Inside this callback function, we set posts when the component is mounted.
        setQuizes()
    }, [setQuizes]);

    const onChangeHandler = e => {
        clearErrors();
        const { name, value } = e.target
        setsubscriberState(subscriberState => ({ ...subscriberState, [name]: value }))
    };

    const onSubscribe = e => {
        e.preventDefault();

        const { name, email } = subscriberState;

        // Create user object
        const subscribedUser = {
            name,
            email
        };

        // Attempt to subscribe
        subscribeToNewsLetter(subscribedUser);

                // Reset fields
                setsubscriberState({
                    name: '',
                    email: ''
                })
    }

    return (
        <Container className="posts main px-0 mt-4">

            <blockquote className="blockquote text-center mt-4">
                <h1 className="mb-0 lead text-uppercase font-weight-bold">Knowing matter, so does quizzing!</h1>
                <small className="text-muted ml-2">Welcome, test out your wishes!</small>
            </blockquote>

            <Row className="mt-5 mx-0">
                <Col sm="8" className="px-1 px-lg-4 mt-md-2">
                    <Suspense
                        fallback={
                            <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                <Spinner style={{ width: '5rem', height: '5rem' }} />
                            </div>
                        }>
                        <h3 className="mb-3 text-center lead font-weight-bold">Newest Quizes</h3>

                        {/* Search */}
                        <SearchInput setSearchKey={setSearchKey} placeholder=" Search quizes here ...  " />

                        {allQuizes && allQuizes
                            .filter(quiz => {

                                if (searchKey === "") {
                                    return quiz
                                } else if (quiz.title.toLowerCase().includes(searchKey.toLowerCase())) {
                                    return quiz
                                }
                                return null
                            })
                            .slice(0, 10)
                            .map(quiz => (
                                quiz.questions.length > 0 ?
                                    <PostItem key={quiz._id} quiz={quiz} /> : null
                            ))}

                        {allQuizes.length > 0 ?

                            <div className="mt-4 d-flex justify-content-center">
                                <Link to="/allposts">
                                    <Button outline color="info">View all quizes ...</Button>
                                </Link>
                            </div> :
                            null}

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
                                    <b>Subscribe To Our Newsletter.</b>
                                </h6>

                                <Input type="text" name="name" value={subscriberState.name} bsSize="sm" placeholder="Your name" className="mt-4" onChange={onChangeHandler} minLength="4" maxLength="30" required />

                                <Input type="email" name="email" value={subscriberState.email} bsSize="sm" placeholder="Your Email" className="mt-4" onChange={onChangeHandler} required />

                                <Button color="info" size="sm" className="mt-4">Subscribe</Button>
                            </FormGroup>
                        </Form>

                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
                        </script>
                        <ins className="adsbygoogle"
                            style={{display: "block"}}
                            data-ad-client="ca-pub-1898078821661554"
                            data-ad-slot="4872807059"
                            data-ad-format="auto"
                            data-full-width-responsive="true">
                            </ins>
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>

                    </Row>
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    error: state.errorReducer,
    subscribedUsers: state.subscribersReducer.subscribedUsers,
    allQuizes: state.quizesReducer.allQuizes,
    questionsData: state.questionsReducer.questionsData,
})

export default connect(mapStateToProps, { subscribeToNewsLetter, clearErrors, setQuizes })(Posts)