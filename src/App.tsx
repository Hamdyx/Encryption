import React from 'react';
import PasswordGenerator from './features/password-generator';
import CaesarCipher from './features/caesar-cipher';

const App: React.FC = () => {
	return (
		<div className="App">
			<PasswordGenerator />
			<CaesarCipher />
		</div>
	);
};

export default App;
