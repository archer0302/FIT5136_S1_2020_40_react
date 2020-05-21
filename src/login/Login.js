import React from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm'
import { Tabs, Tab } from 'react-bootstrap'

const LoginTabs = styled(Tabs).attrs({
	defaultActiveKey: "Coordinator",
})``;

class Login extends React.Component {
	render() {
		return (
			<LoginTabs>
				<Tab eventKey="Coordinator" title="Coordinator">
					<LoginForm/>
				</Tab>
				<Tab eventKey="Administrator" title="Administrator">
					<LoginForm/>
				</Tab>
			</LoginTabs>
		)
	}
}

export default Login;