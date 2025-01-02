import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import AuthService from '../../util/auth';
import { Link } from 'react-router-dom';
import { createUser, 
    loginUser
  
   } from '../../util/API';

const Signup = () => {

    // set initial form state
    const [userFormData, setUserFormData] = useState({ name: '', email: '', password: '', role: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
   

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

     

        //with this Mutation code commented out--- you can signup
        //but it elminates the usage of the token
        /// figure out the regular equivalent to the 
        //signup mutation portion
        //|| || ||
        //\/ \/ \/
        const user  = await createUser(userFormData);
        const data  = await loginUser(userFormData);
        const token= data.token;
        if (token === null || token === undefined)
         {    
           setShowAlert(true);
         console.log('something went wrong!')
         }
        else {       
         console.log(user)
         AuthService.login(token);
       }

        setUserFormData({
            name: '',
            email: '',
            password: '',
            role: '',
        });

    };

  
    return (
        <>
        {/* This is needed for the validation functionality above */}
        <br></br>
        <br></br>
        <br></br>
        <div className='d-flex mx-auto w-50 '>
        <Form className='w-50' noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your signup!
            </Alert>

            <Form.Group>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Your name'
                    name='name'
                    onChange={handleInputChange}
                    value={userFormData.name}
                    required
                />
                <Form.Control.Feedback type='invalid'>name is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor='email'>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Your email address'
                    name='email'
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                />
                <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor='password'>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Your password'
                    name='password'
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                />
                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor='role'>Household Role</Form.Label>
                <Form.Control
                    type='role'
                    placeholder='Your household role'
                    name='role'
                    onChange={handleInputChange}
                    value={userFormData.role}
                    required
                />
                <Form.Control.Feedback type='invalid'>Role is required!</Form.Control.Feedback>
            </Form.Group>
            <Button
            disabled={!(userFormData.name && userFormData.email && userFormData.password && userFormData.role)}
            type='submit'
            variant='info'>
                Submit
            </Button>
         
            </Form>
            </div>

            <div className='d-flex mx-auto w-50 '>
            <p className="center">Already have an account with us?<br /><Link to="/login" className="add-padding link-text bold-text">Login to your account</Link></p>
            </div>
            <br></br>
<br>
      </br><br></br>
<br>
      </br>
    </>
);
};
export default Signup;