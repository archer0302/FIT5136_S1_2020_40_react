import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: #3b2b30;
	color: white;
	padding: 50px;
	margin: auto;
	border-radius: 4px;
	width: 900px;
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

const ShuttleView = ({ shuttleId }) => {
	const [shuttle, setShuttle] = useState({});

	useEffect(() =>  {
		if (shuttleId) {
			const fetchData = async () => {
				const response = await axios.get(`http://localhost:8080/shuttle/${shuttleId}`);
				setShuttle(response.data);
			}
			fetchData();
		}
	}, [shuttleId]);

	return (
		<Wrapper>
			<Content>
				<h2 style={{ textAlign: 'center',marginBottom: '20px' }}>SHUTTLE PROFILE</h2>
				<StyledTable>
					<tr>
						<td style={{fontWeight: 'bold'}}>Name</td>
						<td>{shuttle.name}</td>
					</tr>
					<tr>
						<td style={{fontWeight: 'bold'}}>Manufacture Year</td>
						<td>{shuttle.manufactureYear}</td>
						<td style={{fontWeight: 'bold'}}>Origin</td>
						<td>{shuttle.origin}</td>
					</tr>
					<tr>
						<td style={{fontWeight: 'bold'}}>Fuel Capacity</td>
						<td>{shuttle.fuelCapacity}</td>
						<td style={{fontWeight: 'bold'}}>Passenger Capacity</td>
						<td>{shuttle.passengerCapacity}</td>
						<td style={{fontWeight: 'bold'}}>Cargo Capacity</td>
						<td>{shuttle.cargoCapacity}</td>
					</tr>
					<tr>
						<td style={{fontWeight: 'bold'}}>Travel Speed</td>
						<td>{shuttle.travelSpeed}</td>
					</tr>
				</StyledTable>
			</Content>
		</Wrapper>
	)
}

export default ShuttleView;