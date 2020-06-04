import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { ErrorModal } from '../common/Utils';
import axios from 'axios';
import styled from 'styled-components';

const TableWrapper = styled.div`
  background-color: #F4EEEB;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  margin: auto;
`;

const MissionList = () => {
  const [deleteMissionName, setDeleteMissionName] = useState('');
  const [deleteMissionId, setDeleteMissionId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("id");

	const [missionList, setMissionList] = useState([]);
  
  useEffect(() =>  {
    console.log(id);
    const url = role === 'coordinator' ? 
        `http://localhost:8080/mission/list/${id}` : `http://localhost:8080/mission/list/`;
    const fetchData = async () => {
      const response = await axios.get(url);
      setMissionList(response.data);
    }
    fetchData();
  }, []);

  const deleteMission = (missionId) => {
    axios.delete(`http://localhost:8080/mission/${missionId}`)
        .then((res) => {
          setShowModal(false);
          setMissionList(
            missionList.filter(mission => mission.id != missionId)
          );
        })
        .catch(function (error) {
					console.log(error.response.data);
					setErrorMessage(error.response.data);
          setShowErrorModal(true);
				});

  }

  const deleteConfirm = (missionId, missionName) => {
    setDeleteMissionId(missionId);
    setDeleteMissionName(missionName);
    setShowModal(true);
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th></th>
            <th>Mission name</th>
            <th>Shuttle</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { missionList.map(
            mission => 
              <tr key={mission.id}>
                <td>{mission.id}</td>
                <td>{mission.missionName}</td>
                <td>{mission.shuttleId}</td>
                <td></td>
                <td style={{ textAlign: 'right' }}>
                  <Button size="sm" style={{ marginRight: 10 }}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => deleteConfirm(mission.id, mission.missionName)}>Delete</Button>
                </td>
              </tr>
            ) 
          }
        </tbody>
      </Table>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete {deleteMissionName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteMission(deleteMissionId)}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ErrorModal showModal={showErrorModal} setShowModal={setShowErrorModal} errorMessage={errorMessage} />
    </TableWrapper>
  )
}

export default MissionList;