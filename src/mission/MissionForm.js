import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ErrorMessage } from '../common/Utils';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

const FormWrapper = styled(Form)`
  width: 60%;
  margin: auto;
  padding: 50px;
  padding-top:35px;
  color: #5C3D47;
  background-color: #F4EEEB;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 50px;
`

const MissionForm =  ({ missionId }) => {
  const history = useHistory();

  const [mission, setMission] = useState({
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
    jobs: [
      {
        name: '',
        description: ''
      }
    ],
    deletedJobId: []
  });

  useEffect(() =>  {
    if (missionId) {
      console.log(missionId);
      const fetchData = async () => {
        const missionResponse = await axios.get(`http://localhost:8080/mission/${missionId}`);
        const jobResponse = await axios.get(`http://localhost:8080/mission/job/${missionId}`);
        const missionData = missionResponse.data;
        missionData.jobs = jobResponse.data;
        missionData.deletedJobId = [];
        setMission(missionData);
        console.log(missionData);
      }
      fetchData();
    }
  }, [missionId]);

  /** yup validation schema */
  const schema = yup.object({
      
  });

  /** setup formik */
  const formik = useFormik({
    enableReinitialize: true,
    /** init value */
    initialValues: {
      ...mission
    },
    /** actions when you click submit button */
    onSubmit: values => {
      console.log(values.jobs);
      console.log(values.deletedJobId);
      const url = missionId ? `http://localhost:8080/mission/${missionId}` : `http://localhost:8080/mission/insert`;
      axios.post(url, values)
        .then(res => {
          // if success then do...
          console.log(res);
          history.push(`/mission`);
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
      <FormWrapper onSubmit={formik.handleSubmit}>
        <Link to="/mission">Back to mission list</Link>
        <h2 style={{marginBottom: '20px'}}>{missionId ? 'EDIT MISSION' : 'NEW MISSION'}</h2>
        <Form.Group controlId="formGridMissionName">
          <Form.Label>Mission Name</Form.Label>
          {/** formik controlled column */}
          <Form.Control
            //type="email"
            name="missionName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.missionName}
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
            />
            <ErrorMessage>{formik.errors.occupation && formik.touched.occupation && formik.errors.occupation}</ErrorMessage>
          </Form.Group>
        </Form.Row>
        <h5 style={{marginBottom: '20px'}}>JOB(S)</h5>
          {
            mission.jobs.map(
              (job, index) => 
              <Form.Row key={index}>
                <Button size="sm" variant="flat-danger" onClick={() => {
                    setMission({
                      ...mission,
                      jobs: mission.jobs.filter((job, i) => i !== index),
                    });
                    if (job.id) {
                      mission.deletedJobId.push(job.id);
                    }
                  }}>x</Button>
                <Form.Group as={Col}>
                  <Form.Label>Job Name</Form.Label>
                  <Form.Control
                    name={`jobs[${index}].name`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={job.name}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    name={`jobs[${index}].description`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={job.description}
                  />
                </Form.Group>
              </Form.Row>
            )
          }
        {/** submit button */}
        <Button type="submit" variant="flat-primary">Submit</Button>
      </FormWrapper>
    </>
  )
}
export default MissionForm;