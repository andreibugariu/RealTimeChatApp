import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                email: values.email,
                password: values.password,
                })
                if (response.status === 200) {
                    localStorage.setItem("user_id", response.data.user_id)
                    Cookies.set('token', response.data.token, { expires: 1 }); // Expires in 7 days
                    navigate("/");
                } else {
                    throw(Error("Invalid credentials"))
                }
            } catch (err) {
                alert("something goes wrong")
            }    
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name ]: event.target.value })
    }

    return (
        <Form onSubmit={handleSubmit} className='form-page'>
            <h1>Login</h1>
            <div className='form-inputs'>
                
            <Form.Group className="mb-3" >
                <Form.Label className='white-text'>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"  onChange={(e)=>handleChange(e)} required/>
            </Form.Group>

            <Form.Group className="mb-3" name="password">
                <Form.Label className='white-text'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password"  onChange={(e)=>handleChange(e)} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
                </Button>
                <span className='white-text'>Don't have an account? Press here {<Link to="/register">Register</Link> }</span>
        </div>  
        </Form>
    );
};

export default Login;
