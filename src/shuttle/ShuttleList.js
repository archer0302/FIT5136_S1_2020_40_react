import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const TableWrapper = styled.div`
  background-color: #F4EEEB;
  padding: 20px;
  border-radius: 4px;
  width: 1000px;
  margin: auto;
  color: #5C3D47;
`;

const ShuttleList = ({ handleClose }) => {
	const [shuttleList, setShuttleList] = useState([]);

  useEffect(() =>  {
    const url = `http://localhost:8080/shuttle/list`;
    const fetchData = async () => {
      const response = await axios.get(url);
      setShuttleList(response.data);
    }
    fetchData();
	}, [setShuttleList]);

	return (
		<TableWrapper>
      <h2 style={{marginBottom: '20px', textAlign: 'center'}}>MISSION LIST</h2>
      <Table>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th></th>
            <th>Name</th>
            <th>Year</th>
            <th>Fuel Capacity</th>
            <th>Passenger Capacity</th>
            <th>Cargo Capacity</th>
            <th>Travel Speed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
					{ shuttleList.map(
            shuttle => 
              <tr key={shuttle.id} style={{ textAlign: 'center' }}>
                <td>{shuttle.id}</td>
                <td>{shuttle.name}</td>
                <td>{shuttle.manufactureYear}</td>
                <td>{shuttle.fuelCapacity}</td>
                <td>{shuttle.passengerCapacity}</td>
                <td>{shuttle.cargoCapacity}</td>
                <td>{shuttle.travelSpeed}</td>
                <td style={{ textAlign: 'right' }}>
                  <Button size="sm" variant="flat-danger" onClick={() => handleClose(shuttle.id)}>Assign</Button>
                </td>
              </tr>
            ) 
          }
				</tbody>
			</Table>
		</TableWrapper>
	)
}

export default ShuttleList;