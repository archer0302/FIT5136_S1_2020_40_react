import React, { useState, useEffect } from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';

const CoordinatorMissionList = () => {
  const coordinatorId = window.localStorage.getItem("id");

	const [missionList, setMissionList] = useState([]);
  
  useEffect(() =>  {
    console.log(coordinatorId);
    if (coordinatorId) {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/mission/list/${coordinatorId}`);
        setMissionList(response.data);
      }
      fetchData();
    }
  }, []);

  return (
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
            <tr>
              <td>{mission.id}</td>
              <td>{mission.missionName}</td>
              <td>{mission.shuttleId}</td>
              <td></td>
              <td style={{ textAlign: 'right' }}>
                <Button size="sm" style={{ marginRight: 10 }}>Edit</Button>
                <Button size="sm" variant="danger">Delete</Button>
              </td>
            </tr>
          ) 
        }
      </tbody>
    </Table>
  )
}

export default CoordinatorMissionList;