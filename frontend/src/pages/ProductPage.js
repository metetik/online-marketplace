// Admin or user can see others redirects to login
import React, {useEffect, useState} from 'react';
import ProductService from "../service/ProductsService";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import {Button, Card, Divider, Icon} from "semantic-ui-react";
import toastify from "../util/ToastifyUtil";
import AuthService from "../service/AuthService";
import ProductsService from "../service/ProductsService";

const ProductPage = () => {
	const {id} = useParams();
	const [product, setProduct] = useState({});
	const [currentUser, setCurrentUser] = useState({name : "", roles : []});
	const history = useHistory();

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	const getProduct = (id) => {
		ProductService.getById(id)
			.then((response) => {
				if (response && response.status === StatusCodes.OK) {
					setProduct(response.data)
				}
				else if (response && response.status === StatusCodes.UNAUTHORIZED) {
					history.push("/login", {authError : true});
				}
				else if (response && response.status === StatusCodes.NOT_FOUND){
					console.log(StatusCodes.NOT_FOUND);
				}
			})
	}

	const handleBlackList = (sellerId) => {
		ProductService.addToBlackList(sellerId)
			.then((response) => {
				if (response && response.status === StatusCodes.OK){
					toastify(" ", "Seller added to black list");
				}
				else if (response && response.status === StatusCodes.UNAUTHORIZED) {
					history.push("/login", {authError : true});
				}
				else {
					toastify("error", "error");
				}
			});

	}

	const handleFavoriteList = (productId) => {
		ProductService.addToFavorites(productId)
			.then((response) => {
				if (response && response.status === StatusCodes.OK){
					toastify(" ", "Product added to favorites");
				}
				else if (response && response.status === StatusCodes.UNAUTHORIZED) {
					history.push("/login", {authError : true});
				}
				else {
					toastify("error", "error");
				}
			});
	}
	const handleRemove = async (productId) => {
		const response = await ProductsService.removeProduct(productId);

		if (response && response.status === StatusCodes.OK) {
			toastify(" ", "Product removed from system");
			await sleep(1500);
			history.push("/products");
		}
		else if (response && response.status === StatusCodes.UNAUTHORIZED) {
			history.push("/login", {authError : true});
		}
	}

	useEffect(() => {
		getProduct(id);

		setCurrentUser(AuthService.getCurrentUser());

		window.scrollTo(0, 0);
	},[]);

	return (
		<div>
			<h1>Product</h1>
			<Divider/>
			<Card fluid>
				<Card.Content>
					<Card.Header>{product.name}</Card.Header>
					<Card.Meta>{product.seller?.name}</Card.Meta>
				</Card.Content>
				{currentUser.roles.includes("ROLE_USER") &&
				<Card.Content extra>
					<Button basic compact color='red' size="medium" onClick=
						{() => handleFavoriteList(id)}>
						<Icon.Group>
							<Icon name='heart outline'/>
							<Icon corner name='add'/>
						</Icon.Group>
						Add product to favorites
					</Button>
					<Button basic compact color="black" size="medium"
							onClick={() => handleBlackList(product.seller?.id)}>
						<Icon.Group>
							<Icon name='ban'/>
							<Icon corner name='add'/>
						</Icon.Group>
						Add seller to black list
					</Button>
				</Card.Content>
				}
				{currentUser.roles.includes("ROLE_ADMIN") &&
				<Card.Content extra>
					<Button basic compact color='red' onClick={() => handleRemove(product.id)}>
						<Icon name="trash alternate outline" />
						Remove product
					</Button>
				</Card.Content>
				}
			</Card>

		</div>
	);
};

export default ProductPage;