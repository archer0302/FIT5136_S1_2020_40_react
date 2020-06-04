import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const LogoutButton = ({ setUserName, userName }) => {
	const history = useHistory();

	return (
		<Nav style={{display: 'flex', alignItems: 'baseline'}}>
			<Nav.Item>
				Hello, {userName}
			</Nav.Item>
			<Nav.Item>
				<Nav.Link onClick={() => {
					window.localStorage.removeItem('id');
					window.localStorage.removeItem('role');
					window.localStorage.removeItem('userName');
					setUserName('');
					history.push('/');
				}}>Logout</Nav.Link>
			</Nav.Item>
		</Nav>
	)
}

export default LogoutButton;