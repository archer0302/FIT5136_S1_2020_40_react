import React from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm'
import { Tabs, Tab } from 'react-bootstrap'

const LoginTabs = styled(Tabs).attrs({
	defaultActiveKey: "Administrator",
})``;

class Login extends React.Component {
	render() {
		return (
			<LoginTabs>
				<Tab eventKey="Administrator" title="Administrator">
					<LoginForm role={'admin'}/>
				</Tab>
				<Tab eventKey="Coordinator" title="Coordinator">
					<LoginForm role={'coordinator'}/>
				</Tab>
			</LoginTabs>
		)
	}
}

export default Login;