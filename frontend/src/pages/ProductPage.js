// Admin or user can see others redirects to login
import React, {useEffect, useState} from 'react';
import ProductService from "../service/ProductsService";
import {useLocation, useParams} from "react-router-dom";
import {StatusCodes} from "http-status-codes";

const ProductPage = () => {
	const {id} = useParams();
	const [product, setProduct] = useState(undefined);

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
				// if(response.status === )
				// setProduct(response.data)
			})
	}
	useEffect(() => {
		getProduct(id);

		window.scrollTo(0, 0);
	},[]);

	return (
		<div>
			<h1>Product</h1>
			<h2>{product && product.name}</h2>
		</div>
	);
};

export default ProductPage;