import React from 'react'
import { Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';

const Posts = () => {
    return (
        <Container className="posts mt-4">
            <Row className="mx-md-5">

                <Col sm="12" className="mt-2 px-md-5">
                    <Card body className="bg-secondary px-md-5">
                    
                        <CardTitle tag="h4" className="mb-0 text-primary">
                            <a href="#/">Much about COVID-19 increase</a>
                        </CardTitle>

                        <div className="small-text d-flex justify">
                            <p className="mr-5 my-1 text-danger">February 1, 2021</p>
                            <p className="mr-5 my-1 text-danger">-Pandemics</p>
                        </div>

                        <CardText className="mt-3">This article covers everything you need to know about the COVID-19 and the Corona virus, their origin, effects and consequences</CardText>
                        <div className="tags d-flex">
                            <p className="px-2">COVID-19</p>&nbsp;&nbsp;
                            <p className="px-2">Corona Virus</p>&nbsp;&nbsp;
                        </div>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}

export default Posts
