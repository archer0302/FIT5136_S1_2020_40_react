import React, { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';

const MissionView = () => {
    // const missionID = window.localStorage.getItem("id");
    const missionID = 7003;

    const [mission, setMission] = useState({});

    useEffect(() =>  {
        console.log(missionID);
        if (missionID) {
            const fetchData = async () => {
                const response = await axios.get(`http://localhost:8080/mission/${missionID}`);
                console.log(response.data);
                setMission(response.data);
            }
            fetchData();
        }
    }, []);

    return (
        <div>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Mission Name</Col>
                <Col sm={4}>{mission.missionName}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Launch Date</Col>
                <Col sm={2}>{mission.launchDate}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>mission Description</Col>
                <Col sm={6}>{mission.missionDescription}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Country Of Origin</Col>
                <Col sm={3}>{mission.countryOfOrigin}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Country Allowed</Col>
                <Col sm={3}>{mission.countryAllowed}</Col>
            </Row>
            <Row>
                <Col sm={1} style={{fontWeight: 'bold'}}>Duration</Col>
                <Col sm={4}>{mission.duration}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Age Range</Col>
                <Col sm={3}>{mission.ageRange}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Cargo Requirement</Col>
                <Col sm={3}>{mission.cargoRequirement}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Cargo Type</Col>
                <Col sm={3}>{mission.cargoType}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Cargo Available</Col>
                <Col sm={3}>{mission.cargoAvailable}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Destination</Col>
                <Col sm={4}>{mission.destination}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Status</Col>
                <Col sm={3}>{mission.status}</Col>
                <Col sm={2} style={{fontWeight: 'bold'}}>Shuttle Id</Col>
                <Col sm={3}>{mission.shuttleId}</Col>
            </Row>
            <Row>
                <Col sm={2} style={{fontWeight: 'bold'}}>Coordinator Id</Col>
                <Col sm={3}>{mission.coordinatorId}</Col>
            </Row>
        </div>
    )
}

export default MissionView;