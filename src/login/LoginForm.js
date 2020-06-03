import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'


const StyledForm = styled(Form)`
	color: #5C3D47;
	padding: 30px;
`;

const LoginForm = ({role, setUserName}) => {
	const history = useHistory();
	const [show, setShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	
	const handleClose = () => setShow(false);
	const goRegister = () => history.push('/register');

	/** yup validation schema */ 
	const schema = yup.object({
		email: yup.string()
				.required()
				.email('Invalid email'),
		password: yup.string()
				.required()
	});

	/** setup formik */
	const formik = useFormik({
    initialValues: {
			email: '',
			password: ''
    },
    onSubmit: values => {
      axios.post(`http://localhost:8080/${role}/login`, values)
				.then(res => {
					window.localStorage.setItem('role', role);
					window.localStorage.setItem('id', res.data.id);
					setUserName(res.data.userName);
					history.push(`/${role}/`);
				})
				.catch(function (error) {
					console.log(error.response.data);
					setErrorMessage(error.response.data);
					setShow(true);
				});
		},
		validationSchema: schema
  });

	/** component body */
	return (
		<>
			<StyledForm onSubmit={formik.handleSubmit} style={{}}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Email</Form.Label>
					{/* Column */}
					<Col sm="10">
						<Form.Control
							type="email"
							name="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
					</Col>
					{/* Column for error messages */}
					<Col md={{offset: 2}} style={{color: 'red'}} >{formik.errors.email && formik.touched.email && formik.errors.email}</Col>
				</Form.Group>
				<Form.Group as={Row}>
				<Form.Label column sm="2">Password</Form.Label>
					<Col sm="10">
						<Form.Control
							type="password"
							name="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
						/>
					</Col>
				<Col md={{offset: 2}} style={{color: 'red'}}>{formik.errors.password && formik.touched.password && formik.errors.password}</Col>
				</Form.Group>
				{/** submit button */}
				<Button type="submit" variant="flat-primary">Login</Button>
				{ role === "candidate" && <Button type="submit" onClick={goRegister}>Register</Button> }
			</StyledForm>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
          <Modal.Title>Login Fail</Modal.Title>
        </Modal.Header>
				<Modal.Body>{errorMessage}</Modal.Body>
				<Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
			</Modal>
		</>
	)
}

export default LoginForm;