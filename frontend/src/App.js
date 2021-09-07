import {BrowserRouter, Redirect, Route, Switch, useHistory} from "react-router-dom";
import AuthService from "./service/AuthService";
import NavBar from "./layouts/NavBar";
import 'semantic-ui-css/semantic.min.css';
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import FavoriteListPage from "./pages/FavoriteListPage";
import {Container} from "semantic-ui-react";
import LoginPage from "./pages/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {clearUser} from "./store/actions/userActions";

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
						<Route path="/users">
							<UsersPage />
						</Route>
						<Route path="/favorite-list">
							<FavoriteListPage />
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
		</div>
	);
};

export default App;
