import React, { useState } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

const NewMission =  ({ setUserName }) => {
    const history = useHistory();

    /** yup validation schema */
    const schema = yup.object({
        email: yup.string()
            .required()
            .email('Invalid email'),
        password: yup.string()
            .required(),
        name: yup.string()
            .required()
    });

    /** setup formik */
    const formik = useFormik({
        /** init value */
        initialValues: {
            missionName: '',
            missionDescription: '',
            launchDate: '',
            countryOfOrigin:'',
            countryAllowed:'',
            duration:'',
            ageRange:'',
            cargoRequirement:'',
            cargoType:'',
            cargoAvailable:'',
            destination:'',
            shuttleId:'',
            coordinatorId:'',
        },
        /** actions when you click submit button */
        onSubmit: values => {
            axios.post(`http://localhost:8080/mission/insert`, values)
                .then(res => {
                    // if success then do...
                    console.log(res);
                    //history.push(`/candidate`);
                })
                .catch(function (error) {
                    // if error (http status not 200) then do...
                    console.log(error);
                });
        }
        ,
        /** validation schema */
        validationSchema: schema
    });

    return(
        <>
            <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formGridMissionName">
                        <Form.Label>Mission Name</Form.Label>
                        {/** formik controlled column */}
                        <Form.Control
                            //type="email"
                            name="missionName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.missionName}
                            placeholder="Enter mission name"
                        />
                        {/* Column for error messages */}
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.email && formik.touched.email && formik.errors.email}</Col>
                    </Form.Group>

                    <Form.Group controlId="formGridMissionDescription">
                        <Form.Label>Mission Description</Form.Label>
                        <Form.Control
                            name="missionDescription"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.missionDescription}
                            placeholder="Enter description of the mission"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.password && formik.touched.password && formik.errors.password}</Col>
                    </Form.Group>

                <Form.Group controlId="formGridLaunchDate">
                    <Form.Label>Launch Date</Form.Label>
                    <Form.Control
                        //type="launchDate"
                        name="launchDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.launchDate}
                        placeholder="Enter the launch date"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.address && formik.touched.address && formik.errors.address}</Col>
                </Form.Group>

                <Form.Group controlId="formGridCountryOfOrigin">
                    <Form.Label>Country Of Origin</Form.Label>
                    <Form.Control
                        //type="countryOfOrigin"
                        name="countryOfOrigin"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.countryOfOrigin}
                        placeholder="Enter the origin of country"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.name && formik.touched.name && formik.errors.name}</Col>
                </Form.Group>

                <Form.Group controlId="formGridCountryAllowed">
                    <Form.Label>Country Allowed</Form.Label>
                    <Form.Control
                        //type="countryAllowed"
                        name="countryAllowed"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.countryAllowed}
                        placeholder="Enter countries are allowed"
                    />
                    <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.dob && formik.touched.dob && formik.errors.dob}</Col>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            //type="duration"
                            name="duration"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.duration}
                            placeholder="Enter the duration"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAgeRange">
                        <Form.Label>Age Range</Form.Label>
                        <Form.Control
                            //type="ageRange"
                            name="ageRange"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ageRange}
                            placeholder="Enter the age range of candidates"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</Col>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCargoRequirement">
                        <Form.Label>Cargo Requirement</Form.Label>
                        <Form.Control
                            //type="cargoRequirement"
                            name="cargoRequirement"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cargoRequirement}
                            placeholder="Enter cargo requirements"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.allergies && formik.touched.allergies && formik.errors.allergies}</Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCargoType">
                        <Form.Label>Identification Number(TFN/ABN)</Form.Label>
                        <Form.Control
                            //type="cargoType"
                            name="cargoType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cargoType}
                            placeholder="Enter cargo type"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.identificationNo && formik.touched.identificationNo && formik.errors.identificationNo}</Col>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCargoAvailable">
                        <Form.Label>Cargo Available</Form.Label>
                        <Form.Control
                            //type="cargoAvailable"
                            name="cargoAvailable"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cargoAvailable}
                            placeholder="Enter cargo available"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDestination">
                        <Form.Label>Destination</Form.Label>
                        <Form.Control
                            //type="destination"
                            name="destination"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.destination}
                            placeholder="Enter the destination"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</Col>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridShuttleId">
                        <Form.Label>Shuttle Id</Form.Label>
                        <Form.Control
                            //type="shuttleId"
                            name="shuttleId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.shuttleId}
                            placeholder="Enter the shuttle ID you want to use"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.occupation && formik.touched.occupation && formik.errors.occupation}</Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCoordinatorId">
                        <Form.Label>Coordinator Id</Form.Label>
                        <Form.Control
                            //type="computerSkills"
                            name="coordinatorId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.coordinatorId}
                            placeholder="Enter your id number"
                        />
                        <Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.computerSkills && formik.touched.computerSkills && formik.errors.computerSkills}</Col>
                    </Form.Group>
                </Form.Row>

                {/** submit button */}
                <Button type="submit">Submit</Button>
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
            </Form>
        </>
    )
}
export default NewMission;