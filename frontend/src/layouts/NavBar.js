import React from "react";
import {Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const NavBar = (props) => {
	const handleItemClick = () => {

	}

	return (
		<Menu borderless size="large" fixed="top">
			<Container fluid>
				<Menu.Item
					header
					name="Home"
					as={NavLink}
					to={"/home"}
				/>
				<Menu.Item
					name="Products"
					as={NavLink}
					to={"/products"}
				/>
				<Menu.Item
					name="Users"
					as={NavLink}
					to={"/users"}
				/>
				<Menu.Item
					name="Favorite List"
					as={NavLink}
					to={"/favorite-list"}
				/>
				<Menu.Item
					name='login'
					position="right"
					as={NavLink}
					to={"/login"}
				/>
				{/*<Menu.Item*/}
				{/*	name='logout'*/}
				{/*	onClick={handleItemClick}*/}
				{/*	position="right"*/}
				{/*/>*/}
			</Container>
		</Menu>
	);
};

export default NavBar;
