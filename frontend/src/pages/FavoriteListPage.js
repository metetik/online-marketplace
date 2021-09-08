// Only users can see
import React, {useEffect} from 'react';

const FavoriteListPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<div>
			<h1>Favorite List Page</h1>
		</div>
	);
};

export default FavoriteListPage;
