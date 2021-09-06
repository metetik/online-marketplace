import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthService from "../service/AuthService";

const LoginPage = () => {
	const [credentials, setCredentials] = useState({});

	const history = useHistory();


	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = event.currentTarget;

		// form is valid
		if (form.checkValidity() === true) {
			const response = await AuthService.signin(credentials);

			//use effect => listen token
			if (response) {
				history.push("/home");
			}
		}

		// setValidated(true);
	};

	// change credential values when inputs change
	const handleChange = (event) => {
		setCredentials({...credentials, [event.target.name] : event.target.value});
	};

	return (
		<div>
			<Container className="Content">
				<Row className="justify-content-md-center">
					<Col xs={6}>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formBasicUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control name="username" placeholder="Enter username" onChange={handleChange} required/>
								<Form.Control.Feedback type="invalid">Username is required.</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} required />
								<Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default LoginPage;
