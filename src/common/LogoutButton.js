import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: center;
	margin-bottom: 20px;
	margin-left: 10px;
	color: white;
`;
const LogoutButton = ({ setUserName, userName }) => {
	const history = useHistory();

	return (
		<Wrapper >
			<span style={{textAlign: 'center'}}>Hello, {userName}</span>
			<div>
				<Nav.Link style={{color: '#bf9292'}} onClick={() => {
					window.localStorage.removeItem('id');
					window.localStorage.removeItem('role');
					window.localStorage.removeItem('userName');
					setUserName('');
					history.push('/');
				}}>Logout</Nav.Link>
			</div>
		</Wrapper>
	)
}

export default LogoutButton;