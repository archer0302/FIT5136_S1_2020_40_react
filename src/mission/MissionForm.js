import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Badge, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ErrorMessage } from '../common/Utils';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { BsXSquareFill } from "react-icons/bs";
import moment from 'moment';
import ShuttleView from '../shuttle/ShuttleView';

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
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DeleteButton = styled(BsXSquareFill)`
  margin-top: 40px;
  color: #C95B64;
  cursor: pointer
`;

const MissionForm =  ({ missionId }) => {
  const history = useHistory();
  const role = window.localStorage.getItem("role");
  const coordinatorId = window.localStorage.getItem("id");

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
    status: '',
    coordinatorId: coordinatorId,
    jobs: [],
    empRequirements: [],
    criteria: [],
    deletedJobId: [],
    deletedEmpRequirementId: [],
    deletedCriteriaId: []
  });
  const [showShuttleView, setShowShuttleView] = useState(false);
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');

  useEffect(() =>  {
    axios.get(`http://localhost:8080/coordinator/${coordinatorId}`)
      .then(response => {
        setCoordinatorName(response.data.name);
        setCoordinatorEmail(response.data.email);
      });
    
    if (missionId) {
      console.log(missionId);
      const fetchData = async () => {
        const missionResponse = await axios.get(`http://localhost:8080/mission/${missionId}`);
        const jobResponse = await axios.get(`http://localhost:8080/job/mission/${missionId}`);
        const empRequirementResponse = await axios.get(`http://localhost:8080/empRequirement/mission/${missionId}`);
        const missionData = missionResponse.data;
        missionData.jobs = jobResponse.data;
        missionData.empRequirements = empRequirementResponse.data;
        missionData.deletedJobId = [];
        missionData.deletedEmpRequirementId =[];
        if (role === 'administrator') {
          const criteriaResponse = await axios.get(`http://localhost:8080/criteria/mission/${missionId}`);
          missionData.criteria = criteriaResponse.data;
          missionData.deletedCriteriaId = [];
        }
        setMission(missionData);
        console.log(missionData);
      }
      fetchData();
    }
  }, [missionId]);

  /** yup validation schema */
  const schema = yup.object({
    missionName: yup.string()
        .required(),
    missionDescription: yup.string()
        .max(500, 'Too long. Maximum length is 500 character.')
        .required('Please enter Mission Description'),
    launchDate: yup.string()
        .required('Please enter Launch Date')
        .test(
          'date-format',
          'Invalid input. Date format must be dd/MM/YYYY',
          value => {
            return moment(value, 'DD/MM/YYYY', true).isValid();
          },
        ),
    duration: yup.number()
        .integer('Invalid input. Duration must be a integer.')
        .positive('Invalid input. Duration must be positive.')
        .required(),
    countryOfOrigin: yup.string()
        .required(),
    ageRange: yup.string()
        .matches(/^\d+-\d+$/, 'Incorrect Age range format. Must be "age-age". ex: 24-50')
        .required(),
    cargoAvailable: yup.number()
        .integer('Invalid input. Cargo Available must be a integer.')
        .positive('Invalid input. Cargo Available must be positive.'),
    destination: yup.string()
        .required(),
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
      console.log(values);
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
        <Link to="/mission" style={{ color: '#3b2b30' }}> &lt; Back to mission list</Link>
        <h2 style={{marginBottom: '20px'}}>{missionId ? 'EDIT MISSION' : 'NEW MISSION'}</h2>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Coordinator Name</Form.Label><br/><strong>{coordinatorName}</strong>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Coordinator Email</Form.Label><br/><strong>{coordinatorEmail}</strong>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridMissionName">
            <Form.Label>Mission Name*</Form.Label>
            {/** formik controlled column */}
            <Form.Control
              name="missionName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.missionName}
            />
            {/* Column for error messages */}
            <ErrorMessage>{formik.errors.missionName && formik.touched.missionName && formik.errors.missionName}</ErrorMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridMissionName">
            <Form.Label>Mission Status*</Form.Label>
            <Form.Control
              as="select"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option>Planning Phase</option>
              <option>Departed Earth</option>
              <option>Landed on Mars</option>
              <option>Mission in progress</option>
              <option>Returned to Earth</option>
              <option>Mission completed</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridMissionDescription">
          <Form.Label>Mission Description*</Form.Label>
          <Form.Control
            name="missionDescription"
            as="textarea" rows="5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.missionDescription}
          />
          <ErrorMessage>{formik.errors.missionDescription && formik.touched.missionDescription && formik.errors.missionDescription}</ErrorMessage>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridLaunchDate">
            <Form.Label>Launch Date*</Form.Label>
            <Form.Control
              name="launchDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.launchDate}
            />
            <ErrorMessage>{formik.errors.launchDate && formik.touched.launchDate && formik.errors.launchDate}</ErrorMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDuration">
              <Form.Label>Duration (month)*</Form.Label>
              <Form.Control
                  name="duration"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
              />
              <ErrorMessage>{formik.errors.duration && formik.touched.duration && formik.errors.duration}</ErrorMessage>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCountryOfOrigin">
            <Form.Label>Country Of Origin*</Form.Label>
            <Form.Control
              name="countryOfOrigin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.countryOfOrigin}
            />
            <ErrorMessage>{formik.errors.countryOfOrigin && formik.touched.countryOfOrigin && formik.errors.countryOfOrigin}</ErrorMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCountryAllowed">
            <Form.Label>Country Allowed</Form.Label>
            <Form.Control
              name="countryAllowed"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.countryAllowed}
            />
            <ErrorMessage>{formik.errors.countryAllowed && formik.touched.countryAllowed && formik.errors.countryAllowed}</ErrorMessage>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridAgeRange">
            <Form.Label>Age Range*</Form.Label>
            <Form.Control
              name="ageRange"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ageRange}
            />
            <ErrorMessage>{formik.errors.ageRange && formik.touched.ageRange && formik.errors.ageRange}</ErrorMessage>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCargoType">
            <Form.Label>Cargo Type</Form.Label>
            <Form.Control
              name="cargoType"
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
                value={formik.values.cargoType}
            >
              <option value="">Please select</option>
              <option value="mission">For mission</option>
              <option value="journey">For journey</option>
              <option value="journeyAndMission">For mission and journey</option>
              <option>Other</option>
            </Form.Control>
            <ErrorMessage>{formik.errors.cargoType && formik.touched.cargoType && formik.errors.cargoType}</ErrorMessage>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCargoRequirement">
            <Form.Label>Cargo Requirement</Form.Label>
            <Form.Control
              name="cargoRequirement"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoRequirement}
            />
            <ErrorMessage>{formik.errors.cargoRequirement && formik.touched.cargoRequirement && formik.errors.cargoRequirement}</ErrorMessage>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCargoAvailable">
            <Form.Label>Cargo Available</Form.Label>
            <Form.Control
              name="cargoAvailable"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoAvailable}
            />
            <ErrorMessage>{formik.errors.cargoAvailable && formik.touched.cargoAvailable && formik.errors.cargoAvailable}</ErrorMessage>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              name="destination"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.destination}
            />
            <ErrorMessage>{formik.errors.destination && formik.touched.destination && formik.errors.destination}</ErrorMessage>
          </Form.Group>
        </Form.Row>
        {
          mission.id && (
            <Form.Row>
              <Form.Group as={Col} controlId="formGridShuttleId">
                <Form.Label>Shuttle</Form.Label>
                <Link style={{marginLeft: '10px'}} onClick={() => setShowShuttleView(true)}>
                  {mission.shuttleId}
                </Link>
              </Form.Group>
            </Form.Row>
          )
        }
        <hr/>
        <Wrapper>
          <h5>Job(s)</h5>
          <Badge variant="flat-warming" onClick={() => {
            setMission({...formik.values, jobs: [...formik.values.jobs, {name: '', description: ''}]});
          }}>+Add Job</Badge>
        </Wrapper>
        {
          formik.values.jobs.map(
            (job, index) => 
            <Form.Row key={index}>
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
              <DeleteButton onClick={() => {
                  setMission({
                    ...formik.values,
                    jobs: mission.jobs.filter((job, i) => i !== index),
                  });
                  if (job.id) {
                    mission.deletedJobId.push(job.id);
                  }
                }}>x</DeleteButton>
            </Form.Row>
          )
        }
        <hr/>
        <Wrapper>
          <h5>Employee Requirement(s)</h5>
          <Badge variant="flat-warming" onClick={() => {
            setMission({...formik.values, empRequirements: [...formik.values.empRequirements, {title: '', numberOfEmployees: 0}]});
          }}>+Add Employee Requirement</Badge>
        </Wrapper>
        {
          formik.values.empRequirements.map(
            (empRequirement, index) => 
              <Form.Row key={index}>
                <Form.Group as={Col}>
                  <Form.Label>Job Name</Form.Label>
                  <Form.Control
                    name={`empRequirements[${index}].title`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={empRequirement.title}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Number of Employees</Form.Label>
                  <Form.Control
                    name={`empRequirements[${index}].numberOfEmployees`}
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={empRequirement.numberOfEmployees}
                  />
                </Form.Group>
                <DeleteButton onClick={() => {
                    setMission({
                      ...formik.values,
                      empRequirements: mission.empRequirements.filter((empRequirement, i) => i !== index),
                    });
                    if (empRequirement.id) {
                      mission.deletedEmpRequirementId.push(empRequirement.id);
                    }
                  }}>x</DeleteButton>
              </Form.Row>
          )
        }
        {role === 'administrator' && (
            <>
              <Wrapper>
              <h5>Criteria</h5>
              <Badge variant="flat-warming" onClick={() => {
                setMission({...formik.values, criteria: [...formik.values.criteria, { ageRange: '', healthRecord: false, crimeRecord: false }]});
              }}>+Add Criteria</Badge>
              </Wrapper>
              {formik.values.criteria.map(
                (criteria, index) => 
                  <Form.Row key={index}>
                    <Form.Group as={Col}>
                      <Form.Label>Job Name</Form.Label>
                      <Form.Control
                        name={`criteria[${index}].ageRange`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={criteria.ageRange}
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Health Record</Form.Label>
                      <Form.Control
                        name={`criteria[${index}].healthRecord`}
                        as="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={criteria.healthRecord}
                      >
                        <option value={true}>Required</option>
                        <option value={false}>Not required</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Crime Record</Form.Label>
                      <Form.Control
                        name={`criteria[${index}].crimeRecord`}
                        as="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={criteria.crimeRecord}
                      >
                        <option value={true}>Required</option>
                        <option value={false}>Not required</option>
                      </Form.Control>
                    </Form.Group>
                    <DeleteButton onClick={() => {
                        setMission({
                          ...formik.values,
                          criteria: mission.criteria.filter((criteria, i) => i !== index),
                        });
                        if (criteria.id) {
                          mission.deletedCriteriaId.push(criteria.id);
                        }
                      }}>x</DeleteButton>
                  </Form.Row>
                )
              }
            </>
          )
        }
        {/** submit button */}
        <Button style={{ marginTop: '20px' }} type="submit" variant="flat-primary">Save</Button>
      </FormWrapper>
      <Modal show={showShuttleView} onHide={() => setShowShuttleView(false)}>
        <ShuttleView shuttleId={mission.shuttleId} handleClose={() => setShowShuttleView(false)} />
      </Modal>
    </>
  )
}
export default MissionForm;