import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ErrorMessage} from './common/Utils';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import { Link } from 'react-router-dom';


const MissionForm = styled(Form)`
  width: 60%;
  margin: auto;
  padding: 50px;
  padding-top:35px;
  color: #5C3D47;
  background-color: #F4EEEB;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const NewMission =  () => {

    /** yup validation schema */
    const schema = yup.object({
        
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
            <MissionForm onSubmit={formik.handleSubmit}>
              <Link to="/coordinator">Back to mission list</Link>
              <h3 style={{marginBottom: '20px'}}>New Mission</h3>
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
                        <ErrorMessage>{formik.errors.email && formik.touched.email && formik.errors.email}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.password && formik.touched.password && formik.errors.password}</ErrorMessage>
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
                    <ErrorMessage>{formik.errors.address && formik.touched.address && formik.errors.address}</ErrorMessage>
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
                    <ErrorMessage>{formik.errors.name && formik.touched.name && formik.errors.name}</ErrorMessage>
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
                    <ErrorMessage>{formik.errors.dob && formik.touched.dob && formik.errors.dob}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.allergies && formik.touched.allergies && formik.errors.allergies}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.identificationNo && formik.touched.identificationNo && formik.errors.identificationNo}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.qualifications && formik.touched.qualifications && formik.errors.qualifications}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.foodPreferences && formik.touched.foodPreferences && formik.errors.foodPreferences}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.occupation && formik.touched.occupation && formik.errors.occupation}</ErrorMessage>
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
                        <ErrorMessage>{formik.errors.computerSkills && formik.touched.computerSkills && formik.errors.computerSkills}</ErrorMessage>
                    </Form.Group>
                </Form.Row>
                {/** submit button */}
                <Button type="submit" variant="flat-primary">Submit</Button>
            </MissionForm>
        </>
    )
}
export default NewMission;