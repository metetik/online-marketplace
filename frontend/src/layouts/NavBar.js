import React from "react";
import {Container, Menu} from "semantic-ui-react";
import {Link, NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AuthService from "../service/AuthService";
import {clearUser} from "../store/actions/userActions";

const NavBar = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {user} = useSelector(state => state.user);

	const logout = () => {
		AuthService.logout();
		dispatch(clearUser());
		history.push("/logout");
	};

	return (
		<Menu borderless size="large" fixed="top">
			<Container fluid>
				<Menu.Item
					header
					name="Home"
					as={NavLink}
					to={"/home"}
				/>
				{(user.role === "ROLE_USER" || user.role === "ROLE_ADMIN") &&
				<Menu.Item
					name="Products"
					as={NavLink}
					to={"/products"}
				/>
				}
				{(user.role === "ROLE_ADMIN") &&
				<Menu.Item
					name="Users"
					as={NavLink}
					to={"/users"}
				/>
				}
				{(user.role === "ROLE_USER") &&
				<Menu.Item
					name="Favorite List"
					as={NavLink}
					to={"/favorite-list"}
				/>
				}
				<Menu.Menu position="right">
					{!!user.username ?
						<Menu.Item
							name='logout'
							as={Link}
							to="/logout"
							onClick={() => logout()}
						/>
						 :
						<Menu.Item
							name='login'
							as={NavLink}
							to={"/login"}
						/>
					}


				</Menu.Menu>
			</Container>
		</Menu>
	);
};

export default NavBar;
