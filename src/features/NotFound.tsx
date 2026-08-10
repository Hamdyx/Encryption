import type { FunctionComponent } from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FunctionComponent = () => {
	useEffect(() => {
		document.title = 'Page Not Found';
	}, []);

	return (
		<div className="main_container">
			<div className="feature_container">
				<div className="App-header">
					<h2>Page Not Found</h2>
				</div>
				<Link to="/">Back to home</Link>
			</div>
		</div>
	);
};

export default NotFound;
