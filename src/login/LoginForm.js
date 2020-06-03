import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const LoginForm = ({role, setUserName}) => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
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
					console.log(error);
				});
		},
		validationSchema: schema
  });

	/** component body */
	return (
		<Form onSubmit={formik.handleSubmit}>
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
			<Button type="submit">Login</Button>
		</Form>
	)
}

export default LoginForm;