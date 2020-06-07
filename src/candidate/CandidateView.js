import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
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

const CandidateView = () => {
  const candidateId = window.localStorage.getItem("id");
  const [candidate, setCandidate] = useState({});

  useEffect(() =>  {
    console.log(candidateId);
    if (candidateId) {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/candidate/${candidateId}`);
        setCandidate(response.data);
      }
      fetchData();
    }
  }, [candidateId]);

  return (
    <Wrapper>
      <Content>
        <h2 style={{ textAlign: 'center',marginBottom: '20px' }}>CANDIDATE PROFILE</h2>
        <StyledTable>
          <tr>
            <td style={{fontWeight: 'bold'}}>Name</td>
            <td>{candidate.name}</td>
            <td style={{fontWeight: 'bold'}}>Address</td>
            <td>{candidate.address}</td>
          </tr>
          <tr>
            <td  style={{fontWeight: 'bold'}}>Date of Birth</td>
            <td >{candidate.dob}</td>
            <td  style={{fontWeight: 'bold'}}>Nationality</td>
            <td >{candidate.nationality}</td>
          </tr>
          <tr>
            <td style={{fontWeight: 'bold'}}>Identification Number</td>
            <td>{candidate.identificationNo}</td>
            <td style={{fontWeight: 'bold'}}>Gender</td>
            <td>{candidate.gender}</td>
          </tr>
          <tr>
            <td style={{fontWeight: 'bold'}}>Allergies</td>
            <td>{candidate.allergies}</td>
            <td style={{fontWeight: 'bold'}}>Food Preferences</td>
            <td>{candidate.foodPreferences}</td>
          </tr>
          <tr>
            <td style={{fontWeight: 'bold'}}>Occupation</td>
            <td>{candidate.occupation}</td>
            <td style={{fontWeight: 'bold'}}>Computer Skills</td>
            <td>{candidate.computerSkills}</td>
          </tr>
          <tr>
            <td style={{fontWeight: 'bold'}}>Languages Spoken</td>
            <td>{candidate.languages}</td>
          </tr>
        </StyledTable>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Link to="/candidate/edit">
            <Button style={{width: '200px' }} type='button' variant="flat-white">Edit Profile</Button>
          </Link>
        </div>
      </Content>
    </Wrapper>
  )
}

export default CandidateView;