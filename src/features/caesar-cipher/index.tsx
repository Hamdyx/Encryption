import React from 'react';
import { useState } from 'react';

const CaesarCipher: React.FC = () => {
	const [inputKey, setInputKey] = useState(1);
	const [inputText, setInputText] = useState('');
	const [encryptedStr, setEncryptedStr] = useState('');

	const handleTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = ev.target.value;
		setInputText(inputValue);
	};
	const handleKeyChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = parseInt(ev.target.value);
		setInputKey(inputValue);
	};

	const lowerCaseReg = /[a-z]/;
	const upperCaseReg = /[A-Z]/;

	const encryptUpperCase = (letter: string) => {
		let enc = letter.charCodeAt(0);
		enc += inputKey;
		while (enc > 90) enc = 64 + (enc - 90);

		return String.fromCharCode(enc);
	};
	const encryptLowerCase = (letter: string) => {
		let enc = letter.charCodeAt(0);
		enc += inputKey;
		while (enc > 122) enc = 64 + (enc - 122);

		return String.fromCharCode(enc);
	};

	const encryptText = () => {
		const _encrypted: string[] = Array(inputText.length);
		for (let i = 0; i < inputText.length; i++) {
			if (lowerCaseReg.test(inputText[i])) {
				_encrypted[i] = encryptLowerCase(inputText[i]);
			} else if (upperCaseReg.test(inputText[i])) {
				_encrypted[i] = encryptUpperCase(inputText[i]);
			} else {
				_encrypted[i] = inputText[i];
			}
		}
		const tmp = _encrypted.join('');
		setEncryptedStr(tmp);
	};

	return (
		<div className="cipher-encryption">
			<div className="App-header">
				<h2>Caesar Cipher Encryption</h2>
			</div>
			<div className="cipher_encryption-container">
				<div className="aa">
					<label htmlFor="cipher_encryption">Text</label>
					<input
						type="text"
						id="cipher_encryption"
						onChange={handleTextChange}
						value={inputText}
					/>
				</div>
				<div className="aa">
					<label htmlFor="cipher_encryption">Key</label>
					<input
						type="number"
						id="cipher_encryption"
						onChange={handleKeyChange}
						value={inputKey}
						min={1}
						max={10}
					/>
				</div>
			</div>
			<button onClick={encryptText} className="generate-btn">
				Encrypt
			</button>
			<div className="output-password">
				<h3>Encrypted Text</h3>
				{encryptedStr && <h4>{encryptedStr}</h4>}
			</div>
		</div>
	);
};

export default CaesarCipher;
