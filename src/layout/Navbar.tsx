import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
	return (
		<nav className="navbar">
			<CustomLink path="" title="Home" />
			<CustomLink path="generator" title="Generator" />
			<CustomLink path="cipher" title="Cipher" />
		</nav>
	);
};

const CustomLink: React.FC<{ path: string; title: string }> = ({
	path,
	title,
}) => {
	return (
		<NavLink to={path} data-text="Awesome" className="custom_link">
			<span className="actual-text">&nbsp;{title}&nbsp;</span>
			<span className="hover-text" aria-hidden="true">
				&nbsp;{title}&nbsp;
			</span>
		</NavLink>
	);
};

export default Navbar;
