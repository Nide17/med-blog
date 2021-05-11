import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'

import { connect } from 'react-redux';
import { updateQuiz } from '../../redux/quizes/quizes.actions'
import EditIcon from '../../images/edit.svg';

const EditQuiz = ({ qId, qTitle, qDesc, auth, updateQuiz }) => {

    const [quizState, setQuizState] = useState({
        qId,
        name: qTitle,
        description: qDesc,
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        setQuizState({ ...quizState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { qId, name, description } = quizState;

        // VALIDATE
        if (name.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (name.length > 50) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 80) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new Quiz object
        const updatedQuiz = {
            qId,
            title: name,
            description,
            last_updated_by: auth.isLoading === false ? auth.user.id : null
        };

        // Attempt to update
        updateQuiz(updatedQuiz);

        // close the modal
        if (modal) {
            toggle();
        }
    }
    return (

        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div>
                    <img src={EditIcon} onClick={toggle} alt="" width="16" height="16" className="mr-3" />

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}
                    >

                        <ModalHeader toggle={toggle} className="bg-primary text-white">Edit Quiz</ModalHeader>

                        <ModalBody>

                            {errorsState.length > 0 ?
                                errorsState.map(err =>
                                    <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                        {err}
                                    </Alert>) :
                                null
                            }

                            <Form onSubmit={onSubmitHandler}>

                                <FormGroup>

                                    <Label for="name">
                                        <strong>Title</strong>
                                    </Label>

                                    <Input type="text" name="name" id="name" placeholder="Quiz name ..." className="mb-3" onChange={onChangeHandler} value={quizState.name} />

                                    <Label for="description">
                                        <strong>Description</strong>
                                    </Label>

                                    <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={onChangeHandler} value={quizState.description} />

                                    <Button color="success" style={{ marginTop: '2rem' }} block>
                                        Update
                                </Button>

                                </FormGroup>

                            </Form>
                        </ModalBody>
                    </Modal>
                </div> :

                <Reports userId={auth.user._id} /> :

            // If not authenticated or loading
            <div className="m-5 p-5 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    );
}

EditQuiz.propTypes = {
    auth: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { updateQuiz })(EditQuiz);
