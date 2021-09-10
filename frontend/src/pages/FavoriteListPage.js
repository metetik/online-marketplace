// Only users can see
import React, {useEffect, useState} from 'react';
import ProductsService from "../service/ProductsService";
import {Link, useHistory} from "react-router-dom";
import toastify from "../util/ToastifyUtil";
import {Button, Card, Divider, Grid, Icon} from "semantic-ui-react";

const FavoriteListPage = () => {
	const [products, setProducts] = useState([]);
	const [flag, setFlag] = useState(false);
	const history = useHistory();

	const getProducts = () => {
		ProductsService.getFavorites()
			.then((result) => {
				if (!!result) {
					setProducts(result);
				}
				else {
					history.push("/login", {authError : true})
				}
			});
	}

	useEffect(() => {
		getProducts();
		window.scrollTo(0, 0);
	},[flag]);

	const handleRemoveFromFavoriteList = (productId) => {
		ProductsService.removeFromFavorites(productId).then((result) => {
			toastify(" ", "Product removed from favorites");
			setFlag(prevState => (!prevState));
			console.log(result);
		});

	}

	return (
		<div>
			<h1>Favorite List Page</h1>
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
								<Button basic compact color='red' onClick={() => handleRemoveFromFavoriteList(product.id)}>
									<Icon.Group>
										<Icon name='heart outline' />
										<Icon corner name='minus' />
									</Icon.Group>
									Remove from favorites
								</Button>
							</Card.Content>
						</Card>
					</Grid.Column>
				))
				}
			</Grid>
		</div>
	);
};

export default FavoriteListPage;
