import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./layouts/NavBar";
import 'semantic-ui-css/semantic.min.css';
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import FavoriteListPage from "./pages/FavoriteListPage";
import {Container} from "semantic-ui-react";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import {ToastContainer} from "react-toastify";
import React from "react";
import BlackListPage from "./pages/BlackListPage";
import SellersPage from "./pages/SellersPage";

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Container className="content">
					<Switch>
						<Route exact path="/">
							<Redirect to="/home" />
						</Route>
						<Route path="/home">
							<HomePage />
						</Route>
						<Route path="/products">
							<ProductsPage />
						</Route>
						<Route path={"/product/:id"}>
							<ProductPage />
						</Route>
						<Route path="/users">
							<UsersPage />
						</Route>
						<Route path="/sellers">
							<SellersPage />
						</Route>
						<Route path="/favorite-list">
							<FavoriteListPage />
						</Route>
						<Route path="/black-list">
							<BlackListPage />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/logout">
							<LoginPage />
						</Route >
					</Switch>
				</Container>
			</BrowserRouter>
			<ToastContainer position="bottom-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							draggable/>
		</div>
	);
};

export default App;
