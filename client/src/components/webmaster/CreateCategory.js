import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createCategory } from '../../redux/categories/categories.actions';
// import { login } from '../../redux/auth/auth.actions';
// import { clearErrors } from '../../redux/error/error.actions'

class CreateCategory extends Component {

    //properties of the modal
    state = {
        modal: false,
        name: '',
        description: ''
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

        const { name, description } = this.state;

        // Create new Category object
        const newCategory = {
            title: name,
            description
        };

        // Attempt to create
        this.props.createCategory(newCategory);
        if (this.state.modal) {
                this.toggle();
        }
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} className="text-success p-0"><b>+</b> Create Category</NavLink>

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
                                <Input type="text" name="name" id="name" placeholder="Category name ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Label for="description">Description</Label>
                                <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Button color="success" style={{ marginTop: '2rem' }} block >Create</Button>

                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

CreateCategory.propTypes = {
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

export default connect(
    mapStateToProps,
    { createCategory })(CreateCategory);
