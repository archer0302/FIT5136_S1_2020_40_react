import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, Button } from 'react-bootstrap'


const LoginForm = ({role}) => {
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');

	const login = () => {
		axios.post(`http://localhost:8080/${role}/login`, {email, password})
				.then(res => {
					console.log(res);
				})
				.catch(function (error) {
					console.log(error.response.data.message);
				});
	}

	const schema = yup.object({
		email: yup.string()
				.required()
				.email('Invalid email'),
		password: yup.string()
				.required()
	});


	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={schema}
      onSubmit={(values) => {
        axios.post(`http://localhost:8080/${role}/login`, values)
				.then(res => {
					console.log(res);
				})
				.catch(function (error) {
					console.log(error.response.data.message);
				});
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
					<Form.Group as={Row}>
						<Form.Label column sm="2">Email</Form.Label>
						<Col sm="10">
							<Form.Control
								type="email"
								name="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
						</Col>
						<Col md={{offset: 2}}>{errors.email && touched.email && errors.email}</Col>
					</Form.Group>
					<Form.Group as={Row}>
          <Form.Label column sm="2">Password</Form.Label>
						<Col sm="10">
							<Form.Control
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
						</Col>
          <Col md={{offset: 2}}>{errors.password && touched.password && errors.password}</Col>
					</Form.Group>
          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
	)
}

export default LoginForm;