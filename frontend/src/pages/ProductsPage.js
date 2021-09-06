import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { BiEdit, BiTrash } from "react-icons/bi";

const ProductsPage = (props) => {
	const role = props.role;

	return (
		<div>
			<Container className="Content">
				<Row className="justify-content-md-center">
					<Col xs={8}>
						<h2>Products</h2>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Name</th>
									<th>Seller</th>
									{role === "ROLE_ADMIN" && <th>Delete</th>}
									
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Mark</td>
									<td><a href="/"><BiEdit /></a></td>
									<td><BiTrash /></td>
								</tr>
								<tr>
									<td>2</td>
									<td>Jacob</td>
									<td><BiEdit /></td>
									<td><BiTrash /></td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default ProductsPage;
