import React from 'react';
import CipherEcryption from './components/CipherEncryption';
import CipherDecryption from './components/CipherDecryption';

const CaesarCipher: React.FC = () => {
	return (
		<div className="caesar-cipher">
			<CipherEcryption />
			<CipherDecryption />
		</div>
	);
};

export default CaesarCipher;
