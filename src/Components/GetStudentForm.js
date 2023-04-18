import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ReadStudent(){
    const readUser = async (event) => {
        const eventData = new FormData(event.target);
        const formData = {
            name: eventData.get("name")
        };
        const data = axios.post("http://localhost:4000/read-student", formData)
            .then(res => {
                if (res.status === 200) console.log(res)
            })
            .catch(err => console.log(JSON.stringify(err))
            )
            console.log(JSON.stringify(data));
    }
    return(
        <>
            <h1>Get Student Details By Name: </h1>
            <Form onSubmit={readUser}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name: " name="name"/>
                    <Form.Text className="text-muted" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ReadStudent;