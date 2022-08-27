import { MobileEncryption } from 'assets/icons';
import FeatureCard from 'components/FeatureCard';
import React from 'react';

const Landing: React.FC = () => {
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
