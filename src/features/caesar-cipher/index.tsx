import React, { useEffect } from 'react';
import CipherEcryption from './components/CipherEncryption';
import CipherDecryption from './components/CipherDecryption';

const CaesarCipher: React.FC = () => {
	useEffect(() => {
		document.title = 'Caesar Cipher';
	}, []);

	return (
		<div className="caesar-cipher">
			<CipherEcryption />
			<CipherDecryption />
		</div>
	);
};

export default CaesarCipher;
