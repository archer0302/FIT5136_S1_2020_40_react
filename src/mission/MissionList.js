import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { ErrorModal } from '../common/Utils';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShuttleList from '../shuttle/ShuttleList';
import ShuttleView from '../shuttle/ShuttleView';

const TableWrapper = styled.div`
  background-color: #F4EEEB;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  margin: auto;
  color: #5C3D47;
`;

const MissionList = () => {
  const [deleteMissionName, setDeleteMissionName] = useState('');
  const [deleteMissionId, setDeleteMissionId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showShuttleAssign, setShowShuttleAssign] = useState(false);
  const [showShuttleView, setShowShuttleView] = useState(0);
  const [shuttleMissionIndex, setShuttleMissionIndex] = useState({});
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
  }, [id, role]);

  const deleteMission = (missionId) => {
    axios.delete(`http://localhost:8080/mission/${missionId}`)
        .then((res) => {
          setShowModal(false);
          setMissionList(
            missionList.filter(mission => mission.id !== missionId)
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

  const handleShuttleAssignClose = (shuttleId) => {
    const shuttleMission = missionList[shuttleMissionIndex];
    const url = `http://localhost:8080/mission/${shuttleMission.id}`;
    axios.post(url, {...shuttleMission, shuttleId});
    shuttleMission.shuttleId = shuttleId;
    setShowShuttleAssign(false);
  }

  return (
    <>
    <TableWrapper>
      <h2 style={{marginBottom: '20px', textAlign: 'center'}}>MISSION LIST</h2>
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
            (mission, index) => 
              <tr key={mission.id} style={{ textAlign: 'center' }}>
                <td><Link to={`/mission/view/${mission.id}`} style={{ marginRight: 10 }}>{mission.id}</Link></td>
                <td>{mission.missionName}</td>
                <td>
                  {
                    mission.shuttleId ? (
                      <Link onClick={() => setShowShuttleView(mission.shuttleId)}>
                        {mission.shuttleId}
                      </Link>
                    ) :
                      role === 'administrator' ? <Button size="sm" variant="flat-success" onClick={() => 
                        {
                          setShuttleMissionIndex(index);
                          setShowShuttleAssign(true);
                        }
                      }>Assign</Button> : 'Not assigned'
                  }
                </td>
                <td>{mission.status}</td>
                <td style={{ textAlign: 'right' }}>
                  <Link to={`/mission/edit/${mission.id}`} style={{ marginRight: 10 }}><Button size="sm" variant="flat-primary">Edit</Button></Link>
                  <Button size="sm" variant="flat-danger" onClick={() => deleteConfirm(mission.id, mission.missionName)}>Delete</Button>
                </td>
              </tr>
            ) 
          }
        </tbody>
      </Table>
      <Link to="/mission/new"><Button variant="flat-success">New Mission</Button></Link>
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
    <Modal show={showShuttleAssign} onHide={() => setShowShuttleAssign(false)}>
      <ShuttleList handleClose={handleShuttleAssignClose} />
    </Modal>
    <Modal show={showShuttleView} onHide={() => setShowShuttleView(0)}>
      <ShuttleView shuttleId={showShuttleView} handleClose={() => setShowShuttleView(0)} />
    </Modal>
    </>
  )
}

export default MissionList;