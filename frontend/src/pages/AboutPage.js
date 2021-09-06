import React from "react";

import { Container, Row, Col } from "react-bootstrap";


const AboutPage = () => {
	return (
		<div>
			<Container className="Content">
				<Row className="justify-content-md-center">
					<Col xs={8}>
						<h2>About Page</h2>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AboutPage;
