import React, { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';

const CandidateInformation = () => {
    // const candidateId = window.localStorage.getItem("id");
    const candidateId = 2204;

    const [candidate, setCandidate] = useState({});

    useEffect(() =>  {
        console.log(candidateId);
        if (candidateId) {
            const fetchData = async () => {
                const response = await axios.get(`http://localhost:8080/candidate/${candidateId}`);
                console.log(response.data);
                setCandidate(response.data);
            }
            fetchData();
        }
    }, []);

    return (
        <div>
            <Row>
                <Col sm={1} style={{fontWeight: 'bold'}}>Name</Col>
                <Col sm={4}>{candidate.name}</Col>
                <Col sm={1} style={{fontWeight: 'bold'}}>Address</Col>
                <Col sm={4}>{candidate.address}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Date of Birth</Col>
                <Col sm={3}>{candidate.dob}</Col>
                <Col sm={1} style={{fontWeight: 'bold'}}>Nationality</Col>
                <Col sm={4}>{candidate.nationality}</Col>
            </Row>
            <Row>
                <Col sm={3} style={{fontWeight: 'bold'}}>Identification Number</Col>
                <Col sm={2}>{candidate.identificationNo}</Col>
                <Col sm={1} style={{fontWeight: 'bold'}}>Gender</Col>
                <Col sm={3}>{candidate.gender}</Col>
            </Row>
            <Row>
                <Col sm={1} style={{fontWeight: 'bold'}}>Allergies</Col>
                <Col sm={4}>{candidate.allergies}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Food Preferences</Col>
                <Col sm={4}>{candidate.foodPreferences}</Col>
            </Row>
            <Row>
                <Col sm={1} style={{fontWeight: 'bold'}}>Occupation</Col>
                <Col sm={4}>{candidate.occupation}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Computer Skills</Col>
                <Col sm={4}>{candidate.computerSkills}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Languages Spoken</Col>
                <Col sm={4}>{candidate.languages}</Col>
            </Row>
        </div>
    )
}

export default CandidateInformation;