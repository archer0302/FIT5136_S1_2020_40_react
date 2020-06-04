import React from 'react';
import styled from 'styled-components';
import MissionList from '../mission/MissionList';
import {Col, Tab, Tabs} from 'react-bootstrap';

const LoginTabs = styled(Tabs).attrs({
	defaultActiveKey: "MissionList",
})`
	border-radius: 4px;
	background: #9c888e;
	flex-direction: row;
`;

const LoginContent = styled(Col)`
	border-radius: 4px;
	background-color: #F4EEEB;
	padding: 0px;
`;

const CoordinatorPage = () => {
	return (
		<LoginContent>
			<LoginTabs>
				<Tab eventKey="MissionList" title="Mission List">
					<MissionList/>
				</Tab>
			</LoginTabs>
		</LoginContent>
	)
}

export default CoordinatorPage;