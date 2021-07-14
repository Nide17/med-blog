import React from 'react'
import { Row, Col, TabPane, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import img from '../../../images/Logo Med-Blog.svg'
import AddResourceModal from './AddResourceModal';

const ResourcesTabPane = () => {
    return (
        <TabPane tabId="7">

            <Row>
                <Button size="sm" outline color="info" className="mx-auto my-2">
                    <strong><AddResourceModal /></strong>
                </Button>
            </Row>

            <Row>
                <Col sm="6" className="mt-2 resouces-card">

                    <Card className="d-flex flex-row">
                        <CardImg top width="100%" src={img} alt="Card image cap" className="w-25" />
                        <CardBody>
                            <CardTitle tag="h5">Card title</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>

                </Col>
            </Row>

        </TabPane>
    )
}

export default ResourcesTabPane