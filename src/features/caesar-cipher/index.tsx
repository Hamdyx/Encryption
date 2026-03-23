import type { FunctionComponent } from 'react';

import { useEffect } from 'react';

import CipherDecryption from './components/CipherDecryption';
import CipherEcryption from './components/CipherEncryption';

const CaesarCipher: FunctionComponent = () => {
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
