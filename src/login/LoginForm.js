import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginForm = ({role}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const schema = yup.object({
		email: yup.string()
				.required()
				.email('Invalid email'),
		password: yup.string()
				.required()
	});

	// setup formik
	const formik = useFormik({
    initialValues: {
			email: '',
			password: ''
    },
    onSubmit: values => {
      axios.post(`http://localhost:8080/${role}/login`, values)
				.then(res => {
					console.log(res);
				})
				.catch(function (error) {
					console.log(error.response.data.message);
				});
		},
		validationSchema: schema
  });

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Group as={Row}>
				<Form.Label column sm="2">Email</Form.Label>
				<Col sm="10">
					<Form.Control
						type="email"
						name="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
				</Col>
				<Col md={{offset: 2}}>{formik.errors.email && formik.touched.email && formik.errors.email}</Col>
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
			<Col md={{offset: 2}}>{formik.errors.password && formik.touched.password && formik.errors.password}</Col>
			</Form.Group>
			<Button type="submit">
				Login
			</Button>
		</Form>
	)
}

export default LoginForm;