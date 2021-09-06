import React, {useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AuthService from "../service/AuthService";

const HomePage = () => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const userObject = AuthService.getCurrentUser();

		if (userObject) {
			setUsername(userObject.username);
		}
	},[username])


	return (
		<div>
			<Container className="Content">
				<Row className="justify-content-md-center">
					<Col xs={8}>
						<h2>Welcome {username}</h2>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default HomePage
