import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import AddIcon from '../../images/plus.svg';

import { connect } from 'react-redux';
import { createQuiz } from '../../redux/quizes/quizes.actions';

const AddQuiz = ({ auth, createQuiz, category }) => {

    const [quizState, setQuizState] = useState({
        name: '',
        description: ''
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

        const { name, description } = quizState;

        // VALIDATE
         if (name.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (name.length > 15) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 30) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new Quiz object
        const newQuiz = {
            title: name,
            description,
            category: category._id,
            created_by: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to create
        createQuiz(newQuiz);

        // close the modal
        if (modal) {
            toggle();
        }
        // Reload the page after Quiz addition
        // window.location.reload();
    }

    return (
        <div>
            <NavLink onClick={toggle} className="text-success p-0">
                <img src={AddIcon} alt="" width="10" height="10" className="mb-1" />
            &nbsp;Add Quiz
            </NavLink>

            <Modal
                // Set it to the state of modal true or false
                isOpen={modal}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle} className="bg-primary text-white">
                    Add {category.title} Quiz
                    </ModalHeader>

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

                            <Input type="text" name="name" id="name" placeholder="Quiz name ..." className="mb-3" onChange={onChangeHandler} />

                            <Label for="description">
                                <strong>Description</strong>
                            </Label>

                            <Input type="text" name="description" id="description" placeholder="Quiz description ..." className="mb-3" onChange={onChangeHandler} />

                            <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>

                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(
    mapStateToProps,
    { createQuiz })(AddQuiz);
