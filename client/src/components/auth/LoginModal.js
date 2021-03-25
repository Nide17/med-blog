import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../redux/auth/auth.actions';
import { clearErrors } from '../../redux/error/error.actions'

import PropTypes from 'prop-types';

class LoginModal extends Component {

    //properties of the modal
    state = {
        // initialy doesn't show
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {

            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If Authenticated, Close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    //showing and hiding modal
    toggle = () => {

        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();

        const {email, password } = this.state;
        
        // Create user object
        const user = {
            email,
            password
        };

        this.props.login(user);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle}>Login</NavLink>

                <Modal
                    // Set it to the state of modal true or false
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >

                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>

                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>) : null}

                        <Form onSubmit={this.onSubmitHandler}>

                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email ..."
                                    className="mb-3"
                                    onChange={this.onChangeHandler}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password ..."
                                    className="mb-3"
                                    onChange={this.onChangeHandler}
                                />


                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Login</Button>

                            </FormGroup>

                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

// Map  state props
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors })(LoginModal);
