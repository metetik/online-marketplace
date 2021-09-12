// Admin or user can see others redirects to login
import React, {useEffect, useState} from 'react';
import ProductService from "../service/ProductsService";
import {Link, useLocation, useParams} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import {Button, Card, Divider, Icon} from "semantic-ui-react";
import toastify from "../util/ToastifyUtil";
import AuthService from "../service/AuthService";

const ProductPage = () => {
	const {id} = useParams();
	const [product, setProduct] = useState({});
	const currentUser = AuthService.getCurrentUser();

	const getProduct = (id) => {
		ProductService.getById(id)
			.then((result) => {
				if (result.status === StatusCodes.OK) {
					setProduct(result.data)
					console.log(StatusCodes.OK);
				}
				else if (result.status === StatusCodes.NOT_FOUND){
					console.log(StatusCodes.NOT_FOUND);
				}
			})
	}

	const handleBlackList = (sellerId) => {
		ProductService.addToBlackList(sellerId);
		toastify(" ", "Seller added to black list")
	}

	const handleFavoriteList = (productId) => {
		ProductService.addToFavorites(productId);
		toastify(" ", "Product added to favorites")
	}

	useEffect(() => {
		getProduct(id);

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
			</Card>

		</div>
	);
};

export default ProductPage;