import type { FunctionComponent } from 'react';

import { useState } from 'react';

import AnimatedInput from 'components/AnimatedInput';
import OutputWithCopy from 'components/OutputWithCopy';

import CustomAnimatedBtn from '../../../components/CustomAnimatedBtn';

const CipherEncryption: FunctionComponent = () => {
	const [inputKey, setInputKey] = useState(1);
	const [inputText, setInputText] = useState('');
	const [encryptedStr, setEncryptedStr] = useState('');

	const handleTextChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const inputValue = ev.target.value;
		setInputText(inputValue);
	};
	const handleKeyChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		let inputValue = Number.parseInt(ev?.target?.value || '1');
		inputValue = Math.min(inputValue, 100);
		setInputKey(inputValue);
	};

	const lowerCaseReg = /[a-z]/;
	const upperCaseReg = /[A-Z]/;
	const encryptUpperCase = (letter: string) => {
		//* A => 65 | Z => 90
		let enc = letter.codePointAt(0)!;
		enc += inputKey;
		while (enc > 90) enc = 64 + (enc - 90);

		return String.fromCodePoint(enc);
	};
	const encryptLowerCase = (letter: string) => {
		//* a => 97 | z => 122
		let enc = letter.codePointAt(0)!;
		enc += inputKey;
		while (enc > 122) enc = 96 + (enc - 122);

		return String.fromCodePoint(enc);
	};

	const onEncryptText = () => {
		const _encrypted: string[] = new Array(inputText.length);
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
		<div className="feature_container">
			<div className="App-header">
				<h2>Caesar Cipher Encryption</h2>
			</div>
			<div className="cipher_encryption-container">
				<div className="cipher-input">
					<AnimatedInput
						handleOnChange={handleTextChange}
						value={inputText}
						type="textarea"
					/>
				</div>
				<div className="cipher-input">
					<AnimatedInput
						handleOnChange={handleKeyChange}
						value={inputKey}
						label="key"
						type="number"
						min={1}
						max={10}
					/>
				</div>
			</div>
			<CustomAnimatedBtn title="Encrypt" onButtonClick={onEncryptText} />
			<OutputWithCopy outputText={encryptedStr} />
		</div>
	);
};

export default CipherEncryption;
