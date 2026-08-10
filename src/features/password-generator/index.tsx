import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import AnimatedInput from 'components/AnimatedInput';
import CustomAnimatedBtn from 'components/CustomAnimatedBtn';
import OutputWithCopy from 'components/OutputWithCopy';

import { generatePassword, MAX_LENGTH, MIN_LENGTH } from './generate';

const PasswordGenerator: FunctionComponent = () => {
	const [rawLen, setRawLen] = useState('6');
	const [passStr, setPassStr] = useState('');

	const handleChange = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRawLen(ev.target.value);
	};

	const onGeneratePass = () => {
		setPassStr(generatePassword(Number.parseInt(rawLen, 10)));
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
				<CustomAnimatedBtn
					title="Generate"
					onButtonClick={onGeneratePass}
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
