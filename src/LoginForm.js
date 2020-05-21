import React from 'react';
import styled from 'styled-components'
import { Tabs, Tab, Form, Row, Col } from 'react-bootstrap'

class LoginForm extends React.Component {
	render() {
		return (
			<Form>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Account
					</Form.Label>
					<Col sm="10">
						<Form.Control/>
					</Col>
				</Form.Group>

				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Password
					</Form.Label>
					<Col sm="10">
						<Form.Control type="password" placeholder="Password" />
					</Col>
				</Form.Group>
			</Form>
		)
	}
}

export default LoginForm;