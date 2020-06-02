import React from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm';
import {Row, Col, Tab, Tabs} from 'react-bootstrap';

const LoginTabs = styled(Tabs).attrs({
	defaultActiveKey: "Administrator",
})``;

const LoginPage = () => {
	return (
		<Row>
			<Col>Initiate Second Chance Cooperation (ISCC) is responsible for collaborating with the government of many countries to run space exploration missions. Life on Earth has become challenging and harder to survive with nature at rebellion and resources depleting. ISCC has acquired you to develop a module for a large and complex software system; a module Employ Fast that selects candidates for a mission. The space exploration mission originates from a country but can take candidates from other countries. Just like you, ISCC has acquired other organisations to develop modules related to cargo loading, fuel optimisation, mission control, among others. You need to develop the ‘Employ Fast’ module of the system.</Col>
			<Col>
				<LoginTabs>
					<Tab eventKey="Administrator" title="Administrator">
						<LoginForm role={'administrator'}/>
					</Tab>
					<Tab eventKey="Coordinator" title="Coordinator">
						<LoginForm role={'coordinator'}/>
					</Tab>
				</LoginTabs>
			</Col>
		</Row>
	)
}

export default LoginPage;