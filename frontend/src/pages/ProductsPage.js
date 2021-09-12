// Admin or user can see others redirects to login

import React, {useEffect, useState} from 'react';
import ProductsService from "../service/ProductsService";
import {Link, useHistory} from "react-router-dom";
import {Button, Card, Container, Divider, Grid, GridColumn, Icon, Pagination, Transition} from "semantic-ui-react";
import toastify from "../util/ToastifyUtil";
import AuthService from "../service/AuthService";
import {useFormik} from "formik";
import {StatusCodes} from "http-status-codes";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [showForm, setShowForm] = useState(false);
	const [flag, setFlag] = useState(false);
	const history = useHistory();
	const initialValues = {productName : "", sellerName : ""}
	const pageSize = 15;
	const currentUser = AuthService.getCurrentUser();

	const getProducts = (pageNo, pageSize) => {
		if(currentUser.roles.includes("ROLE_ADMIN")){
			ProductsService.getAllByPage(pageNo,pageSize).then((result) => {
				if (!!result) {
					setProducts(result);
				}
				else {
					history.push("/login", {authError : true})
				}
			});
		}
		else if (currentUser.roles.includes("ROLE_USER")){
			ProductsService.getAllByPageWithoutBlackList(pageNo,pageSize)
				.then((result) => {
					if (!!result) {
						setProducts(result);
					}
					else {
						history.push("/login", {authError : true})
					}
				});
		}
	}

	const handleFavoriteList = (productId) => {
		ProductsService.addToFavorites(productId);
		toastify(" ", "Product added to favorites")
	}

	useEffect( () => {
		getProducts(activePage,pageSize)
		window.scrollTo(0, 0);
	},[showForm,flag]);

	const handlePaginationChange = (e, {activePage}) => {
		getProducts(activePage, pageSize);
		setActivePage(activePage);
	}

	const formik = useFormik(
		{initialValues : initialValues,
			onSubmit : (async (values, actions) => handleSubmit(values, actions))},
	);

	const handleSubmit = (values, actions) => {
		console.log(values);
		ProductsService.addProduct(values)
			.then((response) => {
				actions.resetForm();
				if(response.status === StatusCodes.OK) {
					toastify("success", response.data);
					setFlag(prevState => (!prevState));
				} else {
					toastify("error", "Product couldn't be added to system");
				}
			});
	}
	const toggleVisibility = () => {
		setShowForm((prevState) => (!prevState));
	}

	return (
		<div>
			<Grid columns={3}>
				<GridColumn>
					<h1>Products</h1>
				</GridColumn>
				<GridColumn></GridColumn>
				<GridColumn textAlign="right">
					<div className="ui action input"><input type="text" placeholder="Search..."/>
						<button className="ui icon button"><i aria-hidden="true" className="search icon"></i></button>
					</div>
				</GridColumn>
			</Grid>
			<Divider/>
			<Grid columns={3}>
			{!!products && products.map((product) =>(
				<Grid.Column key={product.id}>
					<Card fluid>
						<Card.Content as={Link} to={`/product/${product.id}`}>
							<Card.Header>{product.name}</Card.Header>
							<Card.Meta>{product.seller?.name}</Card.Meta>
						</Card.Content>
						<Card.Content extra>
							{currentUser.roles.includes("ROLE_USER") ?
								<Button basic compact color='red' onClick={() => handleFavoriteList(product.id)}>
									<Icon.Group>
										<Icon name='heart outline'/>
										<Icon corner name='add'/>
									</Icon.Group>
									Add to favorites
								</Button>
								:
								<Button basic compact color='red' onClick={() => handleFavoriteList(product.id)}>
									<Icon name="trash alternate outline" />
									Remove product
								</Button>
							}
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
			{currentUser.roles.includes("ROLE_ADMIN") &&
			<div>
				<Divider hidden/>
				<Button basic primary
						content={showForm ? "Hide" : "Add"}
						onClick={() => toggleVisibility()}/>
				<Divider hidden/>
				<Transition.Group animation="fly down" duration={500}>
					{showForm && (
						<form className="ui form" onSubmit={formik.handleSubmit}>
							<div className="field">
								<label>Product Name</label>
								<input
									type="text"
									name="productName"
									placeholder="Product Name"
									onChange={formik.handleChange}
									value={formik.values.productName}/>
							</div>
							<div className="field">
								<label>Seller Name</label>
								<input
									type="text"
									name="sellerName"
									placeholder="Seller Name"
									onChange={formik.handleChange}
									value={formik.values.sellerName}/>
							</div>
							<Container textAlign="right">
								<button className="ui positive basic button" type="submit">Add</button>
							</Container>
						</form>
					)}
				</Transition.Group>
				<br/>
			</div>
			}
		</div>
	);
};

export default ProductsPage;