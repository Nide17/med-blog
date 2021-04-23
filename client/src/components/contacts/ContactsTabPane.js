import React, { useEffect } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getContacts, deleteContact } from '../../redux/contacts/contacts.actions'
import ReactLoading from "react-loading";
import DeleteIcon from '../../images/remove.svg';

const ContactsTabPane = ({ currentUser, contacts, getContacts, deleteContact }) => {

    // Lifecycle methods
    useEffect(() => {
        getContacts();
    }, [getContacts]);

    return (
        <TabPane tabId="5">

            {contacts.isLoading ?
                <ReactLoading type="spinningBubbles" color="#33FFFC" /> :

                <Row>
                    {contacts && contacts.contacts.map(contact => (

                        <Col sm="6" className="mt-2" key={contact._id}>

                            <Card body>

                                <CardTitle className="d-flex justify-content-between">
                                    <Link to={`/contact/${contact._id}`} className="text-success">
                                        {contact.contact_name}
                                        &nbsp;<small>({contact.email})</small>
                                    </Link>
                                    {
                                        currentUser.role === 'Admin' ?

                                            <Button size="sm" color="link" className="mr-2" onClick={() => deleteContact(contact._id)}>
                                                <img src={DeleteIcon} alt="" width="16" height="16" />
                                            </Button>
                                            : null
                                    }
                                </CardTitle>

                                <CardText>{contact.message}</CardText>

                            </Card>
                        </Col>
                    ))}
                </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    contacts: state.contactsReducer
})

export default connect(mapStateToProps, { getContacts, deleteContact })(ContactsTabPane)