import React, { useState } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../common/Utils';

const RegisterForm = styled(Form)`
  width: 60%;
  margin: auto;
  padding: 50px;
  padding-top:35px;
  color: #5C3D47;
  background-color: #F4EEEB;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`


const Register =  ({ setUserName }) => {
    const history = useHistory();
    const [candidate, setCandidate] = useState({});
    const [showConsent, setShowConsent] = useState(false);
    // const [showMessage, setShowMessage] = useState(false);

    const displayConsent = () => setShowConsent(true);
    const closeConsent = () => setShowConsent(false);

	/** yup validation schema */ 
	const schema = yup.object({
        email: yup.string()
            .required()
            .email('Invalid email'),
		password: yup.string()
            .required(),
        // name: yup.string()
        //     .required(),
        // address: yup.string()
        //     .required(),
        // dob: yup.string()
        //     .required(),
        // nationality: yup.string()
        //     .required(),
        // gender: yup.string()
        //     .required(),
        // identificationNo: yup.string()
        //     .required(),
        // foodPreferences: yup.string()
        //     .required(),
        // workExperience: yup.string()
        //     .required(),
        // computerSkills: yup.string()
        //     .required(),
        // languages: yup.string()
        //     .required(),
        // allergies: yup.string()
        //     .required(),
        // occupation: yup.string()
        //     .required(),
        // qualifications: yup.string()
        //     .required(),
    });

    const submitRegister = () => {
        axios.post(`http://localhost:8080/candidate/register`, candidate)
            .then(res => {
                // if success then do...
                console.log(res);
                closeConsent();
                window.localStorage.setItem('role', 'candidate');
                window.localStorage.setItem('id', res.data.id);
                window.localStorage.setItem('userName', res.data.name);
                history.push(`/candidate`);
            })
            .catch(function (error) {
                // if error (http status not 200) then do...
                console.log(error);
            });
    }

    /** setup formik */
	const formik = useFormik({
        /** init value */
        initialValues: {
            email: '',
            password: '',
            address: '',
            name:'',
            dob:'',
            nationality:'',
            gender:'',
            identificationNo:'',
            foodPreferences:'',
            workExperience:'',
            computerSkills:'',
            languages:'',
            allergies:'',
            occupation:'',
            qualifications:'',
        },
        /** actions when you click submit button */
        onSubmit: values => {
            displayConsent();
            setCandidate(values);
            console.log('submit');
            console.log(values);
            }
            ,
        /** validation schema */
        validationSchema: schema
      });

    return(
        <>
            <RegisterForm onSubmit={formik.handleSubmit}>
                <Link to="/">Back to homepage</Link>
                <h3 style={{marginBottom: '20px'}}>Register as candidate</h3>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridUsername">
                        <Form.Label>Username(Email)*</Form.Label>
                        {/** formik controlled column */}
                        <Form.Control
                            //type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {/* Column for error messages */}
                        <ErrorMessage>{formik.errors.email && formik.touched.email && formik.errors.email}</ErrorMessage>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password*</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <ErrorMessage>{formik.errors.password && formik.touched.password && formik.errors.password}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridName">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                        //type="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    <ErrorMessage>{formik.errors.name && formik.touched.name && formik.errors.name}</ErrorMessage>
                </Form.Group>

                <Form.Group controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        //type="address"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />
                    <ErrorMessage>{formik.errors.address && formik.touched.address && formik.errors.address}</ErrorMessage>

                </Form.Group>

                <Form.Group controlId="formGridDob">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        //type="name"
                        name="dob"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob}
                    />
                    <ErrorMessage>{formik.errors.dob && formik.touched.dob && formik.errors.dob}</ErrorMessage>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="select your nationality">
                        <Form.Label>Nationality</Form.Label>
                            <Form.Control
                                //type="name"
                                name="nationality"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nationality}
                                as="select">
                            <option>Australian</option>
                            <option>Chinese</option>
                            <option>England</option>
                            <option>American</option>
                            <option>French</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="select your gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            //type="name"
                            name="gender"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender}
                            as="select">
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAllergies">
                        <Form.Label>Allergies</Form.Label>
                        <Form.Control
                            //type="email"
                            name="allergies"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.allergies}
                        />
                        <ErrorMessage>{formik.errors.allergies && formik.touched.allergies && formik.errors.allergies}</ErrorMessage>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridIdNumber">
                        <Form.Label>Identification Number(TFN/ABN)</Form.Label>
                        <Form.Control
                            //type="email"
                            name="identificationNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.identificationNo}
                        />
                        <ErrorMessage>{formik.errors.identificationNo && formik.touched.identificationNo && formik.errors.identificationNo}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridQualification">
                        <Form.Label>Qualifications</Form.Label>
                        <Form.Control
                            //type="qualifications"
                            name="qualifications"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.qualifications}
                        />
                        <ErrorMessage>{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</ErrorMessage>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFoodPreference">
                        <Form.Label>Food Preference</Form.Label>
                        <Form.Control
                            //type="foodPreferences"
                            name="foodPreferences"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.foodPreferences}
                        />
                        <ErrorMessage>{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridddWorkExp">
                    <Form.Label>Work Experience</Form.Label>
                    <Form.Control
                        //type="workExperience"
                        name="workExperience"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.workExperience}
                    />
                    <ErrorMessage>{formik.errors.workExperience && formik.touched.workExperience && formik.errors.workExperience}</ErrorMessage>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridOccupation">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                            //type="occupation"
                            name="occupation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.occupation}
                        />
                        <ErrorMessage>{formik.errors.occupation && formik.touched.occupation && formik.errors.occupation}</ErrorMessage>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFoodCSkill">
                        <Form.Label>Computer Skills</Form.Label>
                        <Form.Control
                            //type="computerSkills"
                            name="computerSkills"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.computerSkills}
                        />
                        <ErrorMessage>{formik.errors.computerSkills && formik.touched.computerSkills && formik.errors.computerSkills}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                {/** change to text input */}
                <Form.Group controlId="formGridLanguages">
                    <Form.Label>Languages Spoken</Form.Label>
                    <Form.Control
                        //type="languages"
                        name="languages"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.languages}
                    />
                    <ErrorMessage>{formik.errors.languages && formik.touched.languages && formik.errors.languages}</ErrorMessage>
                </Form.Group>
                {/** submit button */}
                <Button type="submit" variant="flat-primary">Register</Button>
                <Modal show={showConsent}>
                    <Modal.Header>
                    <Modal.Title>Authorisation Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>I confirm that....(Can not complete register if decline)</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={submitRegister}>
                            Confirm
                        </Button>
                        <Button variant="danger" onClick={closeConsent}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>
            </RegisterForm>
        </>
    )
}
export default Register;