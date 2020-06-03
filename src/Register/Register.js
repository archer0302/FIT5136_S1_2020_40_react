import React, { useState } from 'react';
import { Form,Col, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const Register =  () => {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNtionality] = useState('');
    const [identificationNo, setIdentificationNo] = useState('');
    const [gender, setGender] = useState('');
    const [allergies, setAllergies] = useState('');
    const [foodPreferences, setFoodPreferences] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [occupation, setOccupation] = useState('');
    const [computerSkills, setComputerSkills] = useState('');
    const [languages, setLanguages] = useState('');
    
	/** yup validation schema */ 
	const schema = yup.object({ });

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
						//type="email"
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
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Enter password"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.password && formik.touched.password && formik.errors.password}</Col>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    //type="address"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    placeholder="Enter your address"
                />
                <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.address && formik.touched.address && formik.errors.address}</Col>

            </Form.Group>

            <Form.Group controlId="formGridName">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    //type="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Enter username"
                />
                <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.name && formik.touched.name && formik.errors.name}</Col>
            </Form.Group>

            <Form.Group controlId="formGridDob">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    //type="name"
                    name="dob"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                    placeholder="Enter your date of birth with format 'xx/xx/xxxx'"
                />
                <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.dob && formik.touched.dob && formik.errors.dob}</Col>
            </Form.Group>

            <Form.Row>
                <Form.Group controlId="select your nationality">
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

                <Form.Group controlId="select your gender">
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
                        placeholder="Enter your allergies"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.allergies && formik.touched.allergies && formik.errors.allergies}</Col>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIdNumber">
                    <Form.Label>Identification Number(TFN/ABN)</Form.Label>
                    <Form.Control
                        //type="email"
                        name="identificationNo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.identificationNo}
                        placeholder="Enter your identification number"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.identificationNo && formik.touched.identificationNo && formik.errors.identificationNo}</Col>
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
                        placeholder="Enter your qualifications"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</Col>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFoodPreference">
                    <Form.Label>Food Preference</Form.Label>
                    <Form.Control
                        //type="foodPreferences"
                        name="foodPreferences"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.foodPreferences}
                        placeholder="Enter your food preferences"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</Col>
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
                    placeholder="Enter your work experience"
                />
                <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.workExperience && formik.touched.workExperience && formik.errors.workExperience}</Col>
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
                        placeholder="Enter your occupation"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.occupation && formik.touched.occupation && formik.errors.occupation}</Col>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFoodCSkill">
                    <Form.Label>Computer Skills</Form.Label>
                    <Form.Control
                        //type="computerSkills"
                        name="computerSkills"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.computerSkills}
                        placeholder="Enter your computer skills"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.computerSkills && formik.touched.computerSkills && formik.errors.computerSkills}</Col>
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
                    placeholder="Enter the language you speak"
                />
                <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.languages && formik.touched.languages && formik.errors.languages}</Col>
            </Form.Group>

            {/** submit button */}
			<Button type="submit">Register</Button>
        </Form>

    )
}
export default Register;