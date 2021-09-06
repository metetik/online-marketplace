import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
// import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import SellersPage from "./pages/SellersPage";
import UsersPage from "./pages/Users";
import AuthService from "./service/AuthService";

const App = () => {
	const [currentUser, setCurrentUser] = useState(undefined);
	const [showAdminBoard, setShowAdminBoard] = useState(false);
	const [showUserBoard, setShowUserBoard] = useState(false);

	useEffect(() => {
		//componentDidMount
		const userObject = AuthService.getCurrentUser();

		if (userObject) {
			setCurrentUser(userObject);

			if (userObject.roles.includes("ROLE_ADMIN")) {
				setShowAdminBoard(true);
			}
			else if (userObject.roles.includes("ROLE_USER")) {
				setShowAdminBoard(true);
			}
		}
	});

	const logout = (event) => {
		AuthService.logout();
	};

	return (
		<div className="App">
			<Router>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand as={Link} to="home">
							Online Marketplace
						</Navbar.Brand>
						<Nav className="me-auto">
							<Nav.Link as={Link} to="products">
								Products
							</Nav.Link>
							{showAdminBoard &&
								(<>
								<Nav.Link as={Link} to="users">
									Users
								</Nav.Link>
								<Nav.Link as={Link} to="sellers">
									Sellers
								</Nav.Link>
								</>)
							}
						</Nav>
						<Nav>
							{currentUser ? (
								<Nav.Link onClick={logout}>Logout</Nav.Link>
							) : (
								<Nav.Link as={Link} to="login">
									Login
								</Nav.Link>
							)}
						</Nav>
					</Container>
				</Navbar>
				<Switch>
					<Route path="/home">
						<HomePage />
					</Route>
					<Route path="/products">
						<ProductsPage />
					</Route>
					<Route path="/users">
						<UsersPage />
					</Route>
					<Route path="/sellers">
						<SellersPage />
					</Route>
					<Route path="/login">
						<LoginPage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
