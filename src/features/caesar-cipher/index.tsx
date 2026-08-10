import type { FunctionComponent } from 'react';

import { useEffect } from 'react';

import CipherPanel from './components/CipherPanel';

const CaesarCipher: FunctionComponent = () => {
	useEffect(() => {
		document.title = 'Caesar Cipher';
	}, []);

	return (
		<div className="caesar-cipher">
			<h1 className="visually-hidden">Caesar Cipher</h1>
			<CipherPanel mode="encrypt" />
			<CipherPanel mode="decrypt" />
		</div>
	);
};

export default CaesarCipher;
