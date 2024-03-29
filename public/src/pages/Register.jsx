import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (values.password !== values.confirm_password) {
            setShowError(true)
        } else {
            setShowError(false)
            try {
                const {data} = await axios.post('http://localhost:5000/api/register', {
                username: values.username,
                email: values.email,
                password: values.password,
                confirm_password: values.confirm_password
                })
                navigate("/login");
            } catch (err) {
                alert("something goes wrong")
            }
        }
        
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name ]: event.target.value })
    }

    return (
        <Form onSubmit={handleSubmit} className='form-page'>
            <h1>Register</h1>
            <div className='form-inputs'>
            <Form.Group className="mb-3"  >
                <Form.Label className='white-text'>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)} required/>
            </Form.Group>
                
            <Form.Group className="mb-3" >
                <Form.Label className='white-text'>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"  onChange={(e)=>handleChange(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" name="password">
                <Form.Label className='white-text'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password"  onChange={(e)=>handleChange(e)} required/>
            </Form.Group>
                
            <Form.Group className="mb-3" name="confirm_password">
                <Form.Label className='white-text'>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="confirm_password" onChange={(e) => handleChange(e)} required />
                {
                    showError && (
                        <Alert variant="danger" className="mt-2">
                            Wrong password
                        </Alert>
                   )     
                }    
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Account
                </Button>
                <span className='white-text'>Already have an account? Press here {<Link to="/login">Login</Link> }</span>
        </div>  
        </Form>
    );
};

export default Register;
