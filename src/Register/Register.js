import React from 'react';
import { Form, Row, Col } from 'react-bootstrap'

const Register =  () => {

    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridUsername">
                    <Form.Label>Username(Email)</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" />
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Enter address, multiple address distinct with '/'" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="fname" placeholder="First name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="lname" placeholder="Last Name" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group controlId="select your nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control as="select">
                    <option>Australian</option>
                    <option>Chinese</option>
                    <option>England</option>
                    <option>American</option>
                    <option>French</option>
                </Form.Control>
                </Form.Group>

                <Form.Group controlId="select your gender">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control as="select">
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridAllergies">
                    <Form.Label>Allergires</Form.Label>
                    <Form.Control type="allergies" placeholder="Enter you allergies" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIdNumber">
                    <Form.Label>Identification Number(TFN/ABN)</Form.Label>
                    <Form.Control type="IDnumber" placeholder="Enter your ID number, TFN or ABN number" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridQualification">
                    <Form.Label>Qualifications</Form.Label>
                    <Form.Control type="qualification" placeholder="Enter you qualification" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFoodPreference">
                    <Form.Label>Food Preference</Form.Label>
                    <Form.Control type="FoodPrefer" placeholder="Enter your Food Preference" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridddWorkExp">
                <Form.Label>Work Experience</Form.Label>
                <Form.Control placeholder="Enter work experience" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control type="occupation" placeholder="Enter you Occupation" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFoodCSkill">
                    <Form.Label>Computer Skills</Form.Label>
                    <Form.Control type="cskill" placeholder="Enter your computer skill" />
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="LanguageSpokenSelect">
                <Form.Label>Languages Spoken</Form.Label>
                <Form.Control as="select" multiple>
                    <option>English</option>
                    <option>Chinese</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Japanese</option>
                </Form.Control>
            </Form.Group>
        </Form>

    )
}

export default Register;