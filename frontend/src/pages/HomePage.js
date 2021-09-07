// Everyone can see
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

const HomePage = () => {
	const {user} = useSelector(state => state.user);

	useEffect(() => {
		window.scrollTo(0, 0);
	})

	return (
		<div>
			<h1>Homepage</h1>
			<h2>Welcome {user.username && user.username}</h2>
		</div>
	);
};

export default HomePage;