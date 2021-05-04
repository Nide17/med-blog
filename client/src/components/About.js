import React from 'react'
import { Jumbotron, Col, Row, Card, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import bruce from '../images/Bruceimg.png'
import parmenide from '../images/Parmenideimg.png'
import instagram from '../../src/images/instagram.svg';
import linkedin from '../../src/images/linkedin.svg';
import facebook from '../../src/images/facebook.svg';
import whatsapp from '../../src/images/whatsapp.svg';

const About = () => {
    return (
        <div>
            <Jumbotron className="m-md-5 py-0 text-center">
                <h1 className="display-3 font-weight-bold">Quiz-Blog</h1>
                <p className="lead">
                    Quiz Blog is a web application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.
                </p>

                <hr className="my-2" />
                <p>Reach us on <strong> brucendati@gmail.com </strong>for further details.</p>
            </Jumbotron>

            <Row className="about mx-md-5 my-md-5">
                <Col sm="12">
                    <h3 className="display-4 text-center mb-md-5 mt-0 pt-0">About the authors</h3>
                </Col>
                <Col sm="6">
                    <CardImg top width="90%" src={bruce} alt="Card image" />
                    <Card body>
                        <CardTitle tag="h5">Ndatimana Patrice Bruce</CardTitle>
                        <CardText><strong>Owner and Idea Innovator</strong></CardText>
                        <p>
                            <strong>
                                <img src={whatsapp} alt="" width="20" height="20" />&nbsp;&nbsp;0780579067
                        </strong>
                        </p>

                        <div className="d-flex">
                            <Button size="sm" color="link" className="ml-0 pl-0 mr-2">
                                <a href="https://www.linkedin.com/in/ndatimana-patrice-bruce-20b363195/">
                                    <img src={linkedin} alt="" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.instagram.com/dr.active4/">
                                    <img src={instagram} alt="" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.facebook.com/ndatimana.bruce">
                                    <img src={facebook} alt="" width="20" height="20" />
                                </a>
                            </Button>
                        </div>

                    </Card>
                </Col>

                <Col sm="6">
                    <CardImg top width="90%" src={parmenide} alt="Card image" />
                    <Card body>
                        <CardTitle tag="h4">Niyomwungeri Parmenide Ishimwe</CardTitle>
                        <CardText><strong>Application Developer</strong></CardText>

                        <p>
                            <strong>
                                <img src={whatsapp} alt="" width="20" height="20" />&nbsp;&nbsp;0788551997
                        </strong>
                        </p>

                        <div className="d-flex">
                            <Button size="sm" color="link" className="ml-0 pl-0 mr-2">
                                <a href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/">
                                    <img src={linkedin} alt="" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.instagram.com/ishimwe_parmenide/">
                                    <img src={instagram} alt="" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.facebook.com/nide.drogba.7/">
                                    <img src={facebook} alt="" width="20" height="20" />
                                </a>
                            </Button>
                        </div>
                        
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default About
