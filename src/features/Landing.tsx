import type { FunctionComponent } from 'react';

import { useEffect } from 'react';

import { MobileEncryption } from 'assets/icons';
import FeatureCard from 'components/FeatureCard';

const Landing: FunctionComponent = () => {
	useEffect(() => {
		document.title = 'Encryption App';
	}, []);

	return (
		<div className="main_container">
			<MobileEncryption />
			<div className="cards-container">
				<FeatureCard title="Password Generator" path="generator" />
				<FeatureCard title="Caesar Cipher" path="cipher" />
			</div>
		</div>
	);
};

export default Landing;
