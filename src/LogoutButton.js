import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';

const LogoutButton = ({ setUserName }) => {
	const history = useHistory();

	return (
		<Button onClick={() => {
			window.localStorage.removeItem('id');
			window.localStorage.removeItem('role');
			setUserName('');
			history.push('/');
		}}>Logout</Button>
	)
}

export default LogoutButton;