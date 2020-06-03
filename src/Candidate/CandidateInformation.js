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
                <Col sm={1} style={{fontWeight: 'bold'}}>Name</Col>
                <Col sm={4}>{candidate.name}</Col>
                <Col sm={1} style={{fontWeight: 'bold'}}>Address</Col>
                <Col sm={4}>{candidate.address}</Col>
            </Row>
        </div>
    )
}

export default CandidateInformation;