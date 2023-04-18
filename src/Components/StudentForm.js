import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import '../App.css';
import ReadStudent from './GetStudentForm';

const basicSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Enter a valid email"),
    password: yup.string().required("Required").min(5)
})



function BasicExample() {
    const createUser = async (event) => {
        const eventData = new FormData(event.target);
        const formData = {
            name: eventData.get("name"),
            email: eventData.get("email"),
            password: eventData.get("password")
        };
        const isValid = await basicSchema.isValid(formData);
        console.log(isValid);
        if(isValid){
            const config = { 'content-type': 'application/json' };
            const data = axios.post("http://localhost:4000/", formData, config)
            .then(res => {
                if (res.status === 200) console.log(res)
            })
            .catch(err => console.log(JSON.stringify(err))
            )
            console.log(JSON.stringify(data));
    }

    }
    return (
        <>
            <h1>Student Login</h1>
            <Form onSubmit={createUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="What is your name?" name="name"/>
                <Form.Text className="text-muted" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your college email" name="email"/>
                <Form.Text className="text-muted" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name = "password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>

            <ReadStudent></ReadStudent>
        </>

  );
}

export default BasicExample;