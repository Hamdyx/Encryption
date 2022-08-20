import React from 'react';
import PasswordGenerator from './features/password-generator';
import CaesarCipher from './features/caesar-cipher';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
const App: React.FC = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<nav className="navbar">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/generator">Generator</NavLink>
					<NavLink to="/cipher">Cipher</NavLink>
				</nav>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<PasswordGenerator />
								<CaesarCipher />
							</>
						}
					/>
					<Route path="/generator" element={<PasswordGenerator />} />
					<Route path="/cipher" element={<CaesarCipher />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
