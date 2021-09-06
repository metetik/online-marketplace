import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const UsersPage = () => {
	return (
		<div>
			<Container className="Content">
				<Row className="justify-content-md-center">
					<Col xs={8}>
						<h2>Users</h2>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default UsersPage;
