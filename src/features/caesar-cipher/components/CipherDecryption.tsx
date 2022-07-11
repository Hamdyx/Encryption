import React, { useState } from 'react';
import CustomAnimatedBtn from '../../../components/CustomAnimatedBtn';

const CipherDecryption: React.FC = () => {
	const [inputKey, setInputKey] = useState(1);
	const [inputText, setInputText] = useState('');
	const [decryptedStr, setDecryptedStr] = useState('');

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
	const decryptUpperCase = (letter: string) => {
		//* A => 65 | Z => 90
		let dec = letter.charCodeAt(0);
		dec -= inputKey;
		while (dec < 65) dec = 91 - (65 - dec);

		return String.fromCharCode(dec);
	};
	const decryptLowerCase = (letter: string) => {
		//* a => 97 | z => 122
		let dec = letter.charCodeAt(0);
		dec -= inputKey;
		while (dec < 97) dec = 123 - (97 - dec);

		return String.fromCharCode(dec);
	};

	const decryptText = () => {
		const _encrypted: string[] = Array(inputText.length);
		for (let i = 0; i < inputText.length; i++) {
			if (lowerCaseReg.test(inputText[i])) {
				_encrypted[i] = decryptLowerCase(inputText[i]);
			} else if (upperCaseReg.test(inputText[i])) {
				_encrypted[i] = decryptUpperCase(inputText[i]);
			} else {
				_encrypted[i] = inputText[i];
			}
		}
		const tmp = _encrypted.join('');
		setDecryptedStr(tmp);
	};

	return (
		<div className="cipher-decryption">
			<div className="App-header">
				<h2>Caesar Cipher Decryption</h2>
			</div>
			<div className="cipher_encryption-container">
				<div className="cipher-input">
					<label htmlFor="cipher_decryption-txt">Text</label>
					<input
						type="text"
						id="cipher_decryption-txt"
						onChange={handleTextChange}
						value={inputText}
					/>
				</div>
				<div className="cipher-input">
					<label htmlFor="cipher_decryption-key">Key</label>
					<input
						type="number"
						id="cipher_decryption-key"
						onChange={handleKeyChange}
						value={inputKey}
						min={1}
						max={10}
					/>
				</div>
			</div>
			<CustomAnimatedBtn title="Decrypt" onClick={decryptText} />
			<div className="output-password">
				<h3>Decrypted Text</h3>
				<h4>{decryptedStr}</h4>
			</div>
		</div>
	);
};

export default CipherDecryption;
