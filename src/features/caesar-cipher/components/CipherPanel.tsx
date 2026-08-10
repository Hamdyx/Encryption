import type { FunctionComponent } from 'react';

import { useState } from 'react';

import AnimatedInput from 'components/AnimatedInput';
import CustomAnimatedBtn from 'components/CustomAnimatedBtn';
import OutputWithCopy from 'components/OutputWithCopy';

import { caesarShift } from '../caesar';

interface Props {
	mode: 'encrypt' | 'decrypt';
}

export const MIN_KEY = 1;
export const MAX_KEY = 26;

const CipherPanel: FunctionComponent<Props> = ({ mode }) => {
	const [rawKey, setRawKey] = useState('1');
	const [inputText, setInputText] = useState('');
	const [outputStr, setOutputStr] = useState('');

	const handleTextChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setInputText(ev.target.value);
	};

	const handleKeyChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRawKey(ev.target.value);
	};

	const onTransformText = () => {
		const parsed = Number.parseInt(rawKey, 10);
		const key = Number.isNaN(parsed)
			? MIN_KEY
			: Math.min(Math.max(parsed, MIN_KEY), MAX_KEY);
		const shift = mode === 'encrypt' ? key : -key;
		setOutputStr(caesarShift(inputText, shift));
	};

	const heading =
		mode === 'encrypt'
			? 'Caesar Cipher Encryption'
			: 'Caesar Cipher Decryption';
	const actionTitle = mode === 'encrypt' ? 'Encrypt' : 'Decrypt';

	return (
		<div className="feature_container">
			<div className="App-header">
				<h2>{heading}</h2>
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
						value={rawKey}
						label="key"
						type="number"
						min={MIN_KEY}
						max={MAX_KEY}
					/>
				</div>
			</div>
			<CustomAnimatedBtn
				title={actionTitle}
				onButtonClick={onTransformText}
			/>
			<OutputWithCopy outputText={outputStr} fieldStyle="--cipher" />
		</div>
	);
};

export default CipherPanel;
