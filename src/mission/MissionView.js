import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    background-color: #3b2b30;
    color: white;
    padding: 50px;
    margin: auto;
    border-radius: 4px;
    max-width: 900px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Content = styled.div`
    margin: auto;
`;

const StyledTable = styled.table`
    margin: auto;
    margin-top: 20px;
    margin-bottom: 50px;
    tr {
        margin-right: 10px;
    }
    td {
        width: 180px;
        height: 40px;
    }
`;

const MissionView = ({ missionId }) => {
    const [mission, setMission] = useState({});

    useEffect(() =>  {
        if (missionId) {
            const fetchData = async () => {
                const response = await axios.get(`http://localhost:8080/mission/${missionId}`);
                console.log(response.data);
                setMission(response.data);
            }
            fetchData();
        }
    }, [missionId]);

    return (
        <Wrapper>
            <Content>
                <Link style={{ color:'white', paddingLeft: '35px' }} to="/mission"> &lt; Back to mission list</Link>
                <h2 style={{ textAlign: 'center',marginBottom: '20px' }}>MISSION PROFILE</h2>
                <StyledTable>
                <tr>
                    <td style={{fontWeight: 'bold'}}>Mission Name</td>
                    <td>{mission.missionName}</td>
                    <td style={{fontWeight: 'bold'}}>Launch Date</td>
                    <td>{mission.launchDate}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold'}}>Country Of Origin</td>
                    <td>{mission.countryOfOrigin}</td>
                    <td style={{fontWeight: 'bold'}}>Country Allowed</td>
                    <td>{mission.countryAllowed}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold'}}>Duration</td>
                    <td>{mission.duration}</td>
                    <td style={{fontWeight: 'bold'}}>Age Range</td>
                    <td>{mission.ageRange}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold'}}>Cargo Requirement</td>
                    <td>{mission.cargoRequirement}</td>
                    <td style={{fontWeight: 'bold'}}>Cargo Type</td>
                    <td>{mission.cargoType}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold'}}>Cargo Available</td>
                    <td>{mission.cargoAvailable}</td>
                    <td style={{fontWeight: 'bold'}}>Destination</td>
                    <td>{mission.destination}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold'}}>Status</td>
                    <td>{mission.status}</td>
                    <td style={{fontWeight: 'bold'}}>Shuttle Id</td>
                    <td>{mission.shuttleId}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold'}}>mission Description</td>
                    <td colSpan={3}>{mission.missionDescription}</td>
                </tr>
            </StyledTable>
        </Content>
    </Wrapper>
    )
}

export default MissionView;