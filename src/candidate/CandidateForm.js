import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../common/Utils';
import moment from 'moment';

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

const CandidateForm =  () => {
    const history = useHistory();
    const candidateId = window.localStorage.getItem("id");
    const [showConsent, setShowConsent] = useState(false);
    const [candidate, setCandidate] = useState({
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
    });

    const displayConsent = () => setShowConsent(true);
    const closeConsent = () => setShowConsent(false);

	/** yup validation schema */ 
	const schema = yup.object({
        email: yup.string()
            .required('Please enter email')
            .email('Invalid email'),
        password: yup.string()
            .required('Please enter password')
            .min(8, 'Password too short. Need at least 8 characters.'),
        name: yup.string()
            .required(),
        dob: yup.string()
            .required('Please enter Date of Birth')
            .test(
                'date-format',
                'Invalid input. Date format must be dd/MM/YYYY',
                value => moment(value, 'DD/MM/YYYY', true).isValid(),
            ),
        workExperience: yup.number()
            .positive('Invalid input. Work experience must be positive.'),
    });

    useEffect(() =>  {
        if (candidateId) {
                const fetchData = async () => {
                const candidateResponse = await axios.get(`http://localhost:8080/candidate/${candidateId}`);
                const candidateData = candidateResponse.data;
                setCandidate(candidateData);
            }
            fetchData();
        }
    }, [candidateId]);

    const submitForm = () => {
        const url = candidateId ? `http://localhost:8080/candidate/${candidateId}` : `http://localhost:8080/candidate/register`;
        axios.post(url, formik.values)
            .then(res => {
                if (!candidateId) {
                    closeConsent();
                    window.localStorage.setItem('role', 'candidate');
                    window.localStorage.setItem('id', res.data.id);
                    window.localStorage.setItem('userName', res.data.name);
                }
                history.push(`/candidate`);
            })
            .catch(function (error) {
                // if error (http status not 200) then do...
                console.log(error);
            });
    }

    /** setup formik */
	const formik = useFormik({
        enableReinitialize: true,
        /** init value */
        initialValues: {
            ...candidate
        },
        /** actions when you click submit button */
        onSubmit: values => {
            if (candidateId) {
                submitForm();
            } else {
                displayConsent();
            }
        }
        ,
        /** validation schema */
        validationSchema: schema
      });

    return(
        <>
            <RegisterForm onSubmit={formik.handleSubmit}>
                {
                    candidateId ? (
                        <Link to="/candidate"> &lt; Back to profile view</Link>
                    ) : (
                        <Link to="/"> &lt; Back to homepage</Link>
                    )
                }
                <h3 style={{marginBottom: '20px'}}>{candidateId ? 'EDIT PROFILE' : 'REGISTER AS CANDIDATE'}</h3>
                { !candidateId && (
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Email*</Form.Label>
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
                ) }

                <Form.Group controlId="formGridName">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
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
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    />
                    <ErrorMessage>{formik.errors.address && formik.touched.address && formik.errors.address}</ErrorMessage>
                </Form.Group>

                <Form.Group controlId="formGridIdNumber">
                    <Form.Label>Identification Number(TFN/ABN)</Form.Label>
                    <Form.Control
                        name="identificationNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.identificationNo}
                    />
                    <ErrorMessage>{formik.errors.identificationNo && formik.touched.identificationNo && formik.errors.identificationNo}</ErrorMessage>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDob">
                        <Form.Label>Date of birth*</Form.Label>
                        <Form.Control
                            name="dob"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dob}
                        />
                        <ErrorMessage>{formik.errors.dob && formik.touched.dob && formik.errors.dob}</ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} controlId="select your gender">
                        <Form.Label>Gender*</Form.Label>
                        <Form.Control
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
                    <Form.Group as={Col} controlId="select your nationality">
                        <Form.Label>Nationality</Form.Label>
                            <Form.Control
                                name="nationality"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nationality}
                            >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLanguages">
                        <Form.Label>Languages Spoken</Form.Label>
                        <Form.Control
                            name="languages"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.languages}
                        />
                        <ErrorMessage>{formik.errors.languages && formik.touched.languages && formik.errors.languages}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFoodPreference">
                        <Form.Label>Food Preference</Form.Label>
                        <Form.Control
                            name="foodPreferences"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.foodPreferences}
                        />
                        <ErrorMessage>{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAllergies">
                        <Form.Label>Allergies</Form.Label>
                        <Form.Control
                            name="allergies"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.allergies}
                        />
                        <ErrorMessage>{formik.errors.allergies && formik.touched.allergies && formik.errors.allergies}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridOccupation">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                            name="occupation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.occupation}
                        />
                        <ErrorMessage>{formik.errors.occupation && formik.touched.occupation && formik.errors.occupation}</ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridWorkExperience">
                        <Form.Label>Work Experience (years)</Form.Label>
                        <Form.Control
                            name="workExperience"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workExperience}
                        />
                        <ErrorMessage>{formik.errors.workExperience && formik.touched.workExperience && formik.errors.workExperience}</ErrorMessage>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridQualification">
                        <Form.Label>Qualifications</Form.Label>
                        <Form.Control
                            name="qualifications"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.qualifications}
                        />
                        <ErrorMessage>{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridFoodCSkill">
                    <Form.Label>Computer Skills</Form.Label>
                        <Form.Control
                            name="computerSkills"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.computerSkills}
                        />
                        <ErrorMessage>{formik.errors.computerSkills && formik.touched.computerSkills && formik.errors.computerSkills}</ErrorMessage>
                    </Form.Group>
                </Form.Row>
                {/** submit button */}
                <Button type="submit" variant="flat-primary">
                    {candidateId ? 'Save' : 'Register'}
                </Button>
            </RegisterForm>
            <Modal show={showConsent}>
                <Modal.Header>
                <Modal.Title>Authorisation Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>I confirm that....(Can not complete register if decline)</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={submitForm}>
                        Confirm
                    </Button>
                    <Button variant="danger" onClick={closeConsent}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default CandidateForm;