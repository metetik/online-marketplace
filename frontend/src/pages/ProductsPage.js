// Admin or user can see others redirects to login

import React, {useEffect, useState} from 'react';
import ProductsService from "../service/ProductsService";
import {Link, useHistory} from "react-router-dom";
import {Button, Card, Container, Grid, Pagination} from "semantic-ui-react";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const history = useHistory();
	const pageSize = 15;

	const getProducts = (pageNo, pageSize) => {
		ProductsService.getAllByPage(pageNo,pageSize)
			.then((result) => {
				if (!!result) {
					setProducts(result);
				}
				else {
					history.push("/login", {authError : true})
				}
			});
	}

	useEffect( () => {
		getProducts(activePage,pageSize)
		window.scrollTo(0, 0);
	},[]);

	const handlePaginationChange = (e, {activePage}) => {
		getProducts(activePage, pageSize);
		setActivePage(activePage);
	}
	return (
		<div>
			<h1>Products Page</h1>
			<Grid columns={3}>
			{!!products && products.map((product) =>(

						<Grid.Column key={product.id}>
							<Card>
								<Card.Content as={Link} to={`/product/${product.id}`}>
									{/*<Link ></Link>*/}
									<Card.Header>{product.name}</Card.Header>
									<Card.Meta>{product.seller.name}</Card.Meta>
									{/*<Card.Description>*/}
									{/*	Steve wants to add you to the group <strong>best friends</strong>*/}
									{/*</Card.Description>*/}
								</Card.Content>
								<Card.Content extra>
									<Button basic color='green'>
										Approve
									</Button>
									<Button basic color='red'>
										Decline
									</Button>
								</Card.Content>
							</Card>
						</Grid.Column>
				))
			}
			</Grid>
			<br/>
			<br/>
			<Container>
				<Pagination
					activePage={activePage}
					boundaryRange={1}
					onPageChange={(event, data) => handlePaginationChange(event,data)}
					size='large'
					siblingRange={1}
					totalPages={10}
					// Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
					ellipsisItem={undefined}
					firstItem={undefined}
					lastItem={undefined}
					prevItem={undefined}
					nextItem={undefined}
				/>
			</Container>
		</div>
	);
};

export default ProductsPage;