import React, { useEffect, lazy, Suspense } from 'react'
import { Container, Col, Row, Spinner } from 'reactstrap';

import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import ResponsiveAd from '../adsenses/ResponsiveAd';
import SquareAd from '../adsenses/SquareAd';
const PostItem = lazy(() => import('./PostItem'));

const Posts = ({ setQuizes, allQuizes }) => {

    useEffect(() => {
        // Inside this callback function, we set posts when the component is mounted.
        setQuizes()
    }, [setQuizes]);

    return (
        <Container className="posts main mt-4">

            <blockquote className="blockquote text-center mt-4">
                <h1 className="mb-0 lead text-uppercase font-weight-bold">Knowing matter, so does quizzing!</h1>
                <small className="text-muted ml-2">Welcome, test out your wishes!</small>
            </blockquote>

            <Row className="mt-lg-5">
            <Col sm="2" className="mt-md-2">
                    {/* Google responsive 1 ad */}
                        <ResponsiveAd/>
            </Col>
                <Col sm="8" className="mt-md-2">
                    <Suspense
                        fallback={
                            <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                <Spinner style={{ width: '5rem', height: '5rem' }} />
                            </div>
                        }>
                        <h3 className="mb-3 text-center lead font-weight-bold">All Quizes</h3>
                        {allQuizes && allQuizes.map(quiz => (
                            <PostItem key={quiz._id} quiz={quiz} />
                        ))}
                    </Suspense>
                </Col>
                <Col sm="2" className="mt-md-2">
                    {/* Google square ad */}
                        <SquareAd />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    allQuizes: state.quizesReducer.allQuizes,
})

export default connect(mapStateToProps, { subscribeToNewsLetter, setQuizes })(Posts)