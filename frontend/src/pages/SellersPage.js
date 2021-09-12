// Only admin can see
import React, {useEffect, useState} from 'react';
import {Button, Container, Divider, List, Transition} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import SellerService from "../service/SellerService";
import toastify from "../util/ToastifyUtil";
import {StatusCodes} from "http-status-codes";
import {useFormik} from "formik";

const SellersPage = () => {
	const [sellers, setSellers] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [flag, setFlag] = useState(false);
	const history = useHistory();
	const initialValues = {name : ""}

	const getSellers = () => {
		SellerService.getAll()
			.then((result) => {
				if (!!result) {
					setSellers(result);
				}
				else {
					history.push("/login", {authError : true})
				}
			});
	}

	useEffect(() => {
		getSellers();
		window.scrollTo(0, 0);
	}, [showForm, flag]);

	const formik = useFormik(
		{initialValues : initialValues,
			onSubmit : (async (values, actions) => handleSubmit(values, actions))},
	);

	const handleSubmit = (values, actions) => {
		SellerService.addSeller(values)
			.then((response) => {
				actions.resetForm();
				if(response.status === StatusCodes.OK) {
					console.log(response);
					toastify("success", response.data);
					setFlag(prevState => (!prevState));
				} else {
					toastify("error", "Seller couldn't be added to system");
				}
			});

	}

	const handleRemoveSeller = (sellerId) => {
		SellerService.removeSeller(sellerId)
			.then((result) => {
			if (result.status === StatusCodes.OK) {
				toastify("success", result.data);
				setFlag(prevState => (!prevState));
			}
			else {
				toastify("error", "User couldn't be removed");
			}
		});
	}

	const toggleVisibility = () => {
		setShowForm((prevState) => (!prevState));
	}

	return (
		<div>
			<h1>Sellers</h1>
			<Divider/>
			<List divided verticalAlign="middle">
				{!! sellers && sellers.map((seller) =>(
					<List.Item key={seller.id}>
						<List.Content floated="right">
							<Button basic compact color="red" onClick={() => handleRemoveSeller(seller.id)}>Remove</Button>
						</List.Content>
						<List.Content><h3>{seller.name}</h3></List.Content>
					</List.Item>
				))}
			</List>
			<Divider hidden />
			<Button basic primary
					content={showForm ? "Hide" : "Add"}
					onClick={() => toggleVisibility()} />
			<Divider hidden />
			<Transition.Group animation="fly down" duration={500}>
				{showForm && (
					<form className="ui form" onSubmit={formik.handleSubmit}>
						<div className="field">
							<label>Name</label>
							<input
								type="text"
								name="name"
								placeholder="Name"
								onChange={formik.handleChange}
								value={formik.values.name}/>
						</div>
						<Container textAlign="right">
							<button className="ui positive basic button" type="submit">Add</button>
						</Container>
					</form>
				)}
			</Transition.Group>
		</div>
	);
};

export default SellersPage;