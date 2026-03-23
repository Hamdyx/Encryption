import type { FunctionComponent } from 'react';

import { useState } from 'react';
import ReactGA from 'react-ga4';

import AnimatedInput from 'components/AnimatedInput';
import CustomAnimatedBtn from 'components/CustomAnimatedBtn';
import OutputWithCopy from 'components/OutputWithCopy';

const CipherDecryption: FunctionComponent = () => {
	const [inputKey, setInputKey] = useState(1);
	const [inputText, setInputText] = useState('');
	const [decryptedStr, setDecryptedStr] = useState('');

	const handleTextChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const inputValue = event.target.value;
		setInputText(inputValue);
	};

	const handleKeyChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		let inputValue = Number.parseInt(event?.target?.value || '1');
		inputValue = Math.min(inputValue, 100);

		setInputKey(inputValue);
	};

	const lowerCaseReg = /[a-z]/;
	const upperCaseReg = /[A-Z]/;
	const decryptUpperCase = (letter: string) => {
		//* A => 65 | Z => 90
		let dec = letter.codePointAt(0)!;
		dec -= inputKey;
		while (dec < 65) dec = 91 - (65 - dec);

		return String.fromCodePoint(dec);
	};
	const decryptLowerCase = (letter: string) => {
		//* a => 97 | z => 122
		let dec = letter.codePointAt(0)!;
		dec -= inputKey;
		while (dec < 97) dec = 123 - (97 - dec);

		return String.fromCodePoint(dec);
	};

	const onDecryptText = () => {
		const _encrypted: string[] = new Array(inputText.length);
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
		ReactGA.event({
			category: 'Caesar Cipher',
			action: 'Cipher Decryption',
		});
	};

	return (
		<div className="feature_container">
			<div className="App-header">
				<h2>Caesar Cipher Decryption</h2>
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
			<CustomAnimatedBtn title="Decrypt" onButtonClick={onDecryptText} />
			<OutputWithCopy outputText={decryptedStr} fieldStyle="--cipher" />
		</div>
	);
};

export default CipherDecryption;
