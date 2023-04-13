import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import '../App.css';
import PostComponent from './CreateStudent';


const basicSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Enter a valid email"),
    password: yup.string().required("Required").min(5)
})

function BasicExample() {
    const createUser = async (event) => {
        event.preventDefault();
        let formData = {
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value
        };
        const isValid = await basicSchema.isValid(formData);
        console.log(isValid);

        <PostComponent {...formData} ></PostComponent>
    }
    return (
        <>
            <h1>Student Login</h1>
            <Form onSubmit={createUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="What is your name?" />
                <Form.Text className="text-muted" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your college email" />
                <Form.Text className="text-muted" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </>
  );
}

export default BasicExample;