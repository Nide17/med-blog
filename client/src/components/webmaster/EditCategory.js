import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateCategory } from '../../redux/categories/categories.actions';
// import { clearErrors } from '../../redux/error/error.actions'

class EditCategory extends Component {

    state = {
        modal: false,
        idToUpdate: this.props.idToUpdate,
        name: this.props.editTitle,
        description: this.props.editingCategory
    }

    componentDidUpdate() {
        // If Authenticated, Close modal
        if (this.state.modal) {
            if (this.props.isAuthenticated) {
                this.toggle();
            }
        }
    }

    //showing and hiding modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();

        const { idToUpdate, name, description } = this.state;

        // Create new Category object
        const updatedCategory = {
            idToUpdate,
            name,
            description
        };

        // Attempt to update
        this.props.updateCategory(updatedCategory);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} className="text-white p-0">Edit</NavLink>

                <Modal
                    // Set it to the state of modal true or false
                    isOpen={this.state.modal}
                    toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle}>Create Category</ModalHeader>

                    <ModalBody>

                        {/* {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>) : null} */}
                        <Form onSubmit={this.onSubmitHandler}>

                            <FormGroup>

                                <Label for="name">Title</Label>
                                <Input type="text" name="name" id="name" placeholder="Category name ..." className="mb-3" onChange={this.onChangeHandler} value={this.state.name} />

                                <Label for="description">Description</Label>
                                <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={this.onChangeHandler} value={this.state.description} />

                                <Button color="success" style={{ marginTop: '2rem' }} block>
                                    Create
                                </Button>

                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

EditCategory.propTypes = {
    // isAuthenticated: PropTypes.bool,
    // error: PropTypes.object,
    // login: PropTypes.func.isRequired,
    // clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({
    // isAuthenticated: state.authReducer.isAuthenticated,
    // error: state.errorReducer
});

export default connect(mapStateToProps, { updateCategory })(EditCategory);
