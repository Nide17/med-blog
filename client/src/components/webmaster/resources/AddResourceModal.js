import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import AddIcon from '../../../images/plus.svg';
import ReactLoading from "react-loading";
import LoginModal from '../../auth/LoginModal'
import Reports from '../../webmaster/Reports'
import { connect } from 'react-redux';
import { createResource } from '../../../redux/resources/resources.actions';

const AddResourceModal = ({ auth, createResource }) => {

    const [resourceState, setResourceState] = useState({
        title: '',
        description: '',
        category: '',
        resource_file: ''
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        setResourceState({ ...resourceState, [e.target.name]: e.target.value });
    };

    const onFileHandler = (e) => {
        setResourceState({ ...resourceState, resource_file: e.target.files[0] });
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        const { title, description, category, resource_file } = resourceState;

        // VALIDATE
        if (!category) {
            setErrorsState(['Category is required!']);
            return
        }
        if (title.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (title.length > 70) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 200) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new Resource object
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category)
        formData.append('resource_file', resource_file);
        formData.append('uploadede_by', auth.user ? auth.user._id : null);

        // Attempt to create
        createResource(formData);

        // Reset the form
        resourceState({
            title: '',
            description: '',
            category: '',
            resource_file: ''
        })

        // close the modal
        if (modal) {
            toggle();
        }
    }

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div>
                    <NavLink onClick={toggle} className="text-success p-0">
                        <img src={AddIcon} alt="" width="10" height="10" className="mb-1" />
                        &nbsp;Add Resource
                    </NavLink>

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}
                    >

                        <ModalHeader toggle={toggle} className="bg-primary text-white">
                            Add New Resource
                        </ModalHeader>

                        <ModalBody>

                            {errorsState.length > 0 ?
                                errorsState.map(err =>
                                    <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                        {err}
                                    </Alert>) :
                                null
                            }

                            <Form onSubmit={onSubmitHandler} encType='multipart/form-data'>

                                <FormGroup>

                                    <Label for="name">
                                        <strong>Title</strong>
                                    </Label>
                                    <Input type="text" name="name" id="name" placeholder="Resource name ..." className="mb-3" value={resourceState.title} onChange={onChangeHandler} />

                                    <Label for="description">
                                        <strong>Description</strong>
                                    </Label>
                                    <Input type="text" name="description" id="description" placeholder="Resource description ..." className="mb-3" value={resourceState.description} onChange={onChangeHandler} />

                                    <Label for="category">
                                        <strong>Category</strong>
                                    </Label>
                                    <Input type="select" name="category" id="category" value={resourceState.category} onChange={onChangeHandler}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </Input>

                                    <Label for="resource_file">
                                        <strong>Upload</strong>
                                    </Label>
                                    <Input type="file" accept=".pdf, .doc, .docx, .ppt, .pptx" name="resource_file" placeholder="Company logo ..." value={resourceState.resource_file} onChange={onFileHandler} />

                                    <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>

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

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { createResource })(AddResourceModal);