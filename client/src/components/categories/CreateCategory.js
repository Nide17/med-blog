import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createCategory } from '../../redux/categories/categories.actions';

const CreateCategory = ({ auth, createCategory }) => {

    const [categoryState, setCategoryState] = useState({
        name: '',
        description: ''
    })

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        setCategoryState({ ...categoryState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { name, description } = categoryState;

        // Create new Category object
        const newCategory = {
            title: name,
            description,
            created_by: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to create
        createCategory(newCategory);

        // close the modal
        if (modal) {
            toggle();
        }
        // Reload the page after category addition
        window.location.reload();
    }

    return (
        <div>
            <NavLink onClick={toggle} className="text-success p-0"><b>+</b> Create Category</NavLink>

            <Modal
                // Set it to the state of modal true or false
                isOpen={modal}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle} className="bg-primary text-white">
                    Create Category
                    </ModalHeader>

                <ModalBody>

                    {/* {state.msg ? (
                            <Alert color='danger'>{state.msg}</Alert>) : null} */}
                    <Form onSubmit={onSubmitHandler}>

                        <FormGroup>

                            <Label for="name">
                                <strong>Title</strong>
                            </Label>

                            <Input type="text" name="name" id="name" placeholder="Category name ..." className="mb-3" onChange={onChangeHandler} />

                            <Label for="description">
                                <strong>Description</strong>
                            </Label>

                            <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={onChangeHandler} />

                            <Button color="success" style={{ marginTop: '2rem' }} block >Create</Button>

                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

CreateCategory.propTypes = {
    // isAuthenticated: PropTypes.bool,
    // error: PropTypes.object,
    // login: PropTypes.func.isRequired,
    // clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    // error: state.errorReducer
});

export default connect(
    mapStateToProps,
    { createCategory })(CreateCategory);
