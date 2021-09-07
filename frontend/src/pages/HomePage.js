// Everyone can see
import React, {useEffect} from 'react';
import AuthService from "../service/AuthService";

const HomePage = () => {
	const user = AuthService.getCurrentUser();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])

	return (
		<div>
			<h1>Homepage</h1>
			<h2>Welcome, {user && user.username}</h2>
		</div>
	);
};

export default HomePage;