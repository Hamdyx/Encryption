import { NavLink } from 'react-router-dom';

const FeatureCard: React.FC<{ title: string; path: string }> = ({
	title,
	path,
}) => {
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
