// Only admin can see
import React, {useEffect} from 'react';

const UsersPage = () => {

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<div>
			<h1>UsersPage</h1>
		</div>
	);
};

export default UsersPage;