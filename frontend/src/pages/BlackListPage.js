// Only users can see
import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import toastify from "../util/ToastifyUtil";
import SellerService from "../service/SellerService";
import {Button, Divider, Image, List} from "semantic-ui-react";
import {StatusCodes} from "http-status-codes";

const BlackListPage = () => {
	const [sellers, setSellers] = useState([]);
	const [flag, setFlag] = useState(false);
	const history = useHistory();

	const getSellers = () => {
		SellerService.getBlackList()
			.then((response) => {
				if (response && response.status === StatusCodes.OK) {
					setSellers(response.data);
				}
				else if (response && response.status === StatusCodes.UNAUTHORIZED) {
					history.push("/login", {authError : true})
				}
			});
	}

	useEffect(() => {
		getSellers();
		window.scrollTo(0, 0);
	}, [flag]);

	const handleRemoveFromBlackList = (sellerId) => {
		SellerService.removeFromBlackList(sellerId).then((result) => {
			toastify(" ", "Seller removed from black list");
			setFlag(prevState => (!prevState));
			console.log(result);
		});
	}

	return (
		<div>
			<h1>Black List</h1>
			<Divider/>
			<List divided verticalAlign='middle'>
				{!! sellers && sellers.map((seller) =>(
					<List.Item key={seller.id}>
						<List.Content floated='right'>
							<Button basic compact color='red' onClick={() => handleRemoveFromBlackList(seller.id)}>Remove</Button>
						</List.Content>
						<List.Content><h3>{seller.name}</h3></List.Content>
					</List.Item>
				))}
			</List>

		</div>
	);
};

export default BlackListPage;
