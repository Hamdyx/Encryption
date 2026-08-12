import type { FunctionComponent } from 'react';

import { useId, useState } from 'react';

import AnimatedInput from 'components/AnimatedInput';
import CustomAnimatedBtn from 'components/CustomAnimatedBtn';
import OutputWithCopy from 'components/OutputWithCopy';

import { caesarShift } from '../caesar';

interface Props {
	mode: 'encrypt' | 'decrypt';
}

const CipherPanel: FunctionComponent<Props> = ({ mode }) => {
	const headingId = useId();
	const [rawKey, setRawKey] = useState('1');
	const [inputText, setInputText] = useState('');
	const [outputStr, setOutputStr] = useState('');

	const handleTextChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setInputText(ev.target.value);
		setOutputStr('');
	};

	const handleKeyChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRawKey(ev.target.value);
		setOutputStr('');
	};

	const onTransformText = () => {
		const key = Number.parseInt(rawKey, 10);
		if (Number.isNaN(key)) {
			return;
		}
		const shift = mode === 'encrypt' ? key : -key;
		setOutputStr(caesarShift(inputText, shift));
	};

	const heading =
		mode === 'encrypt'
			? 'Caesar Cipher Encryption'
			: 'Caesar Cipher Decryption';
	const actionTitle = mode === 'encrypt' ? 'Encrypt' : 'Decrypt';
	//* both panels sit on the same page, so names are mode-specific where the
	//* field is wide enough for them; the narrow key input keeps its short
	//* label and is disambiguated by the panel's own accessible name
	const textLabel = `text to ${mode}`;
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
						label="key"
						type="number"
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
