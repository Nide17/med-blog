import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateQuiz } from '../../redux/quizes/quizes.actions'
import EditIcon from '../../images/edit.svg';
// import { clearErrors } from '../../redux/error/error.actions'

const EditQuiz = ({ qId, qTitle, qDesc, auth, updateQuiz }) => {

    const [quizState, setQuizState] = useState({
        qId,
        name: qTitle,
        description: qDesc,
    })

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
        <div>
            <img src={EditIcon} onClick={toggle} alt="" width="16" height="16" className="mr-3" />

            <Modal
                // Set it to the state of modal true or false
                isOpen={modal}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle} className="bg-primary text-white">Edit Quiz</ModalHeader>

                <ModalBody>

                    {/* {state.msg ? (
                            <Alert color='danger'>{state.msg}</Alert>) : null} */}
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
        </div>
    );
}

EditQuiz.propTypes = {
    // isAuthenticated: PropTypes.bool,
    // error: PropTypes.object,
    // login: PropTypes.func.isRequired,
    // clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    // isAuthenticated: state.authReducer.isAuthenticated,
    // error: state.errorReducer
});

export default connect(mapStateToProps, { updateQuiz })(EditQuiz);
