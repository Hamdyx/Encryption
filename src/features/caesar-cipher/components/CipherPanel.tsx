import type { FunctionComponent } from 'react';

import { useId, useState } from 'react';

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
	const headingId = useId();
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
	//* both panels sit on the same page, so every control needs a name that is
	//* unique to its mode
	const textLabel = `text to ${mode}`;
	const keyLabel = mode === 'encrypt' ? 'encryption key' : 'decryption key';
	const outputLabel =
		mode === 'encrypt' ? 'Encrypted text' : 'Decrypted text';

	return (
		<section className="feature_container" aria-labelledby={headingId}>
			<div className="App-header">
				<h2 id={headingId}>{heading}</h2>
			</div>
			<div className="cipher_encryption-container">
				<div className="cipher-input">
					<AnimatedInput
						handleOnChange={handleTextChange}
						value={inputText}
						label={textLabel}
						type="textarea"
					/>
				</div>
				<div className="cipher-input">
					<AnimatedInput
						handleOnChange={handleKeyChange}
						value={rawKey}
						label={keyLabel}
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
			<OutputWithCopy
				outputText={outputStr}
				label={outputLabel}
				fieldStyle="--cipher"
			/>
		</section>
	);
};

export default CipherPanel;
