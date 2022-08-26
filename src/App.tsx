import React from 'react';
import PasswordGenerator from './features/password-generator';
import CaesarCipher from './features/caesar-cipher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from 'features/Landing';
import Navbar from 'layout/Navbar';

const App: React.FC = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/generator" element={<PasswordGenerator />} />
					<Route path="/cipher" element={<CaesarCipher />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
