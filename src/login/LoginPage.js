import React from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm';
import {Row, Col, Tab, Tabs} from 'react-bootstrap';

const LoginTabs = styled(Tabs).attrs({
	defaultActiveKey: "Administrator",
})`
	border-radius: 4px;
	background: #3b2b30;
	flex-direction: row;
	`;
	
const LoginContent = styled(Col)`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 4px;
	background-color: #F4EEEB;
	padding: 0px;
`;

const LoginPage = ({ setUserName }) => {
	return (
		<Row>
			<Col style={{lineHeight: '2.0', padding: '20px'}}>Initiate Second Chance Cooperation (ISCC) is responsible for collaborating with the government of many countries to run space exploration missions. Life on Earth has become challenging and harder to survive with nature at rebellion and resources depleting. ISCC has acquired you to develop a module for a large and complex software system; a module Employ Fast that selects candidates for a mission. The space exploration mission originates from a country but can take candidates from other countries. Just like you, ISCC has acquired other organisations to develop modules related to cargo loading, fuel optimisation, mission control, among others. You need to develop the ‘Employ Fast’ module of the system.</Col>
			<LoginContent>
				<LoginTabs>
					<Tab eventKey="Administrator" title="Administrator">
						<LoginForm role={'administrator'} setUserName={setUserName}/>
					</Tab>
					<Tab eventKey="Coordinator" title="Coordinator">
						<LoginForm role={'coordinator'} setUserName={setUserName}/>
					</Tab>
					<Tab eventKey="Candidate" title="Candidate">
						<LoginForm role={'candidate'} setUserName={setUserName}/>
					</Tab>
				</LoginTabs>
			</LoginContent>
		</Row>
	)
}

export default LoginPage;