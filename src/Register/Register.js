import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const Register =  () => {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    
	/** yup validation schema */ 
	const schema = yup.object({ });

    /** setup formik */
	const formik = useFormik({
        /** init value */
        initialValues: {
            email: '',
            password: '',
            address: ''
        },
        /** actions when you click submit button */
        onSubmit: values => {
            axios.post(`http://localhost:8080/candidate/register`, values)
                    .then(res => {
                        // history.push(`/`);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        /** validation schema */
        validationSchema: schema
      });

    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridUsername">
                    <Form.Label>Username(Email)</Form.Label>
                    {/** formik controlled column */}
                    <Form.Control
						type="email"
                        name="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="Enter username"
					/>
                    {/* Column for error messages */}
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.email && formik.touched.email && formik.errors.email}</Col>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control name="Address" placeholder="Enter address, multiple address distinct with '/'" />
            </Form.Group>

            <Form.Group controlId="formGridName">
                <Form.Label>Address</Form.Label>
                <Form.Control name="Name" placeholder="Enter your name" />
            </Form.Group>

            <Form.Row>
                <Form.Group controlId="select your nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control name="Nationality"as="select">
                    <option>Australian</option>
                    <option>Chinese</option>
                    <option>England</option>
                    <option>American</option>
                    <option>French</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="select your gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control name="Gender" as="select">
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridAllergies">
                    <Form.Label>Allergies</Form.Label>
                    <Form.Control name="Allergies" placeholder="Enter you allergies" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIdNumber">
                    <Form.Label>Identification Number(TFN/ABN)</Form.Label>
                    <Form.Control name="Identification Number" placeholder="Enter your ID number, TFN or ABN number" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridQualification">
                    <Form.Label>Qualifications</Form.Label>
                    <Form.Control name="Qualification" placeholder="Enter you qualification" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFoodPreference">
                    <Form.Label>Food Preference</Form.Label>
                    <Form.Control type="Food Preference" placeholder="Enter your Food Preference" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridddWorkExp">
                <Form.Label>Work Experience</Form.Label>
                <Form.Control name="Work Experience" placeholder="Enter work experience" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control Name="occupation" placeholder="Enter you Occupation" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFoodCSkill">
                    <Form.Label>Computer Skills</Form.Label>
                    <Form.Control Name="Coumputer skills" placeholder="Enter your computer skill" />
                </Form.Group>
            </Form.Row>

            {/** change to text input */}
            <Form.Group controlId="LanguageSpokenSelect">
                <Form.Label>Languages Spoken</Form.Label>
                <Form.Control name="Languages Spoken" as="select" multiple>
                    <option>English</option>
                    <option>Chinese</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Japanese</option>
                </Form.Control>
            </Form.Group>
            {/** submit button */}
			<Button type="submit">Register</Button>
        </Form>

    )
}
export default Register;