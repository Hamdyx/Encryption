import type { CharsetName } from './generate';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import AnimatedInput from 'components/AnimatedInput';
import Checkbox from 'components/Checkbox';
import CustomAnimatedBtn from 'components/CustomAnimatedBtn';
import OutputWithCopy from 'components/OutputWithCopy';

import {
	CHARSET_NAMES,
	DEFAULT_OPTIONS,
	generatePassword,
	MAX_LENGTH,
	MIN_LENGTH,
} from './generate';

const PasswordGenerator: FunctionComponent = () => {
	const [rawLen, setRawLen] = useState('6');
	const [options, setOptions] = useState(DEFAULT_OPTIONS);
	const [passStr, setPassStr] = useState('');

	const noneSelected = CHARSET_NAMES.every((name) => !options[name]);

	const handleChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRawLen(ev.target.value);
	};

	const handleOptionChange = (name: CharsetName) => (checked: boolean) => {
		setOptions((current) => ({ ...current, [name]: checked }));
	};

	const onGeneratePass = () => {
		setPassStr(generatePassword(Number.parseInt(rawLen, 10), options));
	};

	useEffect(() => {
		document.title = 'Password Generator';
	}, []);

	return (
		<div className="main_container">
			<div className="feature_container">
				<div className="App-header">
					<h1>Password Generator</h1>
				</div>
				<div className="password_length-container">
					<AnimatedInput
						handleOnChange={handleChange}
						value={rawLen}
						label="length"
						type="number"
						min={MIN_LENGTH}
						max={MAX_LENGTH}
					/>
				</div>
				<fieldset className="charset_options">
					<legend>Character types</legend>
					<div className="charset_options-list">
						{CHARSET_NAMES.map((name) => (
							<Checkbox
								key={name}
								label={name}
								checked={options[name]}
								onCheckedChange={handleOptionChange(name)}
							/>
						))}
					</div>
					{/* the live region is always mounted so the hint is announced
					    when the last character type is unchecked */}
					<p className="charset_hint" role="status">
						{noneSelected
							? 'Select at least one character type.'
							: ''}
					</p>
				</fieldset>
				<CustomAnimatedBtn
					title="Generate"
					onButtonClick={onGeneratePass}
					disabled={noneSelected}
				/>

				<OutputWithCopy
					outputText={passStr}
					label="Generated password"
					fieldStyle="--password"
				/>
			</div>
		</div>
	);
};

export default PasswordGenerator;
