import React, { useState } from 'react';
import CustomAnimatedBtn from '../../../components/CustomAnimatedBtn';
import { AiFillLock } from 'react-icons/ai';

const CipherEncryption: React.FC = () => {
	const [inputKey, setInputKey] = useState(1);
	const [inputText, setInputText] = useState('');
	const [encryptedStr, setEncryptedStr] = useState('');

	const handleTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = ev.target.value;
		setInputText(inputValue);
	};
	const handleKeyChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue = parseInt(ev.target.value);
		inputValue = inputValue > 100 ? 100 : inputValue;
		setInputKey(inputValue);
	};

	const lowerCaseReg = /[a-z]/;
	const upperCaseReg = /[A-Z]/;
	const encryptUpperCase = (letter: string) => {
		//* A => 65 | Z => 90
		let enc = letter.charCodeAt(0);
		enc += inputKey;
		while (enc > 90) enc = 64 + (enc - 90);

		return String.fromCharCode(enc);
	};
	const encryptLowerCase = (letter: string) => {
		//* a => 97 | z => 122
		let enc = letter.charCodeAt(0);
		enc += inputKey;
		while (enc > 122) enc = 96 + (enc - 122);

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
				<div className="cipher-input">
					<label htmlFor="cipher_encryption">Text</label>
					<textarea
						id="cipher_encryption"
						onChange={handleTextChange}
						value={inputText}
					/>
				</div>
				<div className="cipher-input">
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
			<CustomAnimatedBtn title="Encrypt" onClick={encryptText} />
			<div className="output-container --cipher">
				<h3>Encrypted</h3>
				<AiFillLock className="lock_icon" />
				<div className="output-box --cipher">{encryptedStr}</div>
			</div>
		</div>
	);
};

export default CipherEncryption;
