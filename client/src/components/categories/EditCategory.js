import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateCategory } from '../../redux/categories/categories.actions';
import EditIcon from '../../images/edit.svg';
// import { clearErrors } from '../../redux/error/error.actions'

const EditCategory = ({ idToUpdate, editTitle, editingCategory, auth, updateCategory }) => {

    const [categoryState, setCategoryState] = useState({
        idToUpdate,
        name: editTitle,
        description: editingCategory,
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

        const { idToUpdate, name, description } = categoryState;

        // Create new Category object
        const updatedCategory = {
            idToUpdate,
            title: name,
            description,
            last_updated_by: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to update
        updateCategory(updatedCategory);

        // close the modal
        if (modal) {
            toggle();
        }
    }
    return (
        <div>
            <NavLink onClick={toggle} className="text-dark p-0">
                <img src={EditIcon} alt="" width="16" height="16" />
            </NavLink>

            <Modal
                // Set it to the state of modal true or false
                isOpen={modal}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle} className="bg-primary text-white">Edit Category</ModalHeader>

                <ModalBody>

                    {/* {state.msg ? (
                            <Alert color='danger'>{state.msg}</Alert>) : null} */}
                    <Form onSubmit={onSubmitHandler}>

                        <FormGroup>

                            <Label for="name">
                                <strong>Title</strong>
                            </Label>

                            <Input type="text" name="name" id="name" placeholder="Category name ..." className="mb-3" onChange={onChangeHandler} value={categoryState.name} />

                            <Label for="description">
                                <strong>Description</strong>
                            </Label>

                            <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={onChangeHandler} value={categoryState.description} />

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

EditCategory.propTypes = {
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

export default connect(mapStateToProps, { updateCategory })(EditCategory);
