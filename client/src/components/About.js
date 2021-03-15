import React from 'react'
import { Jumbotron, Col, Row, Card, CardTitle, CardText, CardImg } from 'reactstrap';
import img from '../images/Logo Med-Blog.svg'

const About = () => {
    return (
        <div>
            <Jumbotron className="m-md-5 py-0 text-center">
                <h1 className="display-3 font-weight-bold">Med-Blog</h1>
                <p className="lead">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A magni quas nulla ipsam exercitationem blanditiis ea iure corporis qui facilis?
                </p>

                <hr className="my-2" />
                <p>Our email is brucendati@gmail.com</p>
            </Jumbotron>

            <Row className="about mx-md-5 my-md-5">
                <Col sm="12">
                    <h3 className="display-4 text-center mb-md-3">About the authors</h3>
                </Col>
                <Col sm="6">
                    <CardImg top width="100%" src={img} alt="Card image" />
                    <Card body>
                        <CardTitle tag="h5">Special Title</CardTitle>
                        <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sint!</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <CardImg top width="100%" src={img} alt="Card image" />
                    <Card body>
                        <CardTitle tag="h5">Special Title</CardTitle>
                        <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sint!</CardText>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default About
