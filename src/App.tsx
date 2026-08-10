import type { FunctionComponent } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Landing from 'features/Landing';
import Navbar from 'layout/Navbar';

import CaesarCipher from './features/caesar-cipher';
import PasswordGenerator from './features/password-generator';

const App: FunctionComponent = () => {
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
