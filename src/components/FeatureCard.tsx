import type { FunctionComponent } from 'react';

import { NavLink } from 'react-router-dom';

interface Props {
	title: string;
	path: string;
}

const FeatureCard: FunctionComponent<Props> = ({ title, path }) => {
	return (
		<div className="feature_card">
			<h2>{title}</h2>
			<NavLink to={`/${path}`} className="card_link">
				{path}
				<span />
			</NavLink>
		</div>
	);
};

export default FeatureCard;
