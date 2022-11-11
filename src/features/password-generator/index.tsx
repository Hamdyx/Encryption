import React, { useEffect, useState } from 'react';
import CustomAnimatedBtn from '../../components/CustomAnimatedBtn';
import OutputWithCopy from 'components/OutputWithCopy';
import AnimatedInput from 'components/AnimatedInput';

const PasswordGenerator: React.FC = () => {
	const [passLen, setPassLen] = useState(6);
	const [passStr, setPassStr] = useState('');

	const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		let inputLen = parseInt(ev?.target?.value || '1');
		inputLen = inputLen > 32 ? 32 : inputLen;
		setPassLen(inputLen);
	};
	const generatePass = () => {
		//* symbol => 33 | symbol => 47
		//* number => 48 | number => 57
		//* symbol => 58 | symbol => 64
		//* A => 65 | Z => 90
		//* symbol => 91 | symbol => 96
		//* a => 97 | z => 122
		//* symbol => 123 | symbol => 126
		const passArr = Array(passLen);
		for (let i = 0; i < passArr.length; i++) {
			const randNumber = Math.random() * 93; //* 126 - 33
			const randCode = Math.floor(randNumber) + 33;
			const randChar = String.fromCharCode(randCode);
			passArr[i] = randChar;
		}
		setPassStr(passArr.join(''));
	};
	useEffect(() => {
		document.title = 'Password Generator';
	}, []);

	return (
		<div className="main_container">
			<div className="feature_container">
				<div className="App-header">
					<h2>Password Generator</h2>
				</div>
				<div className="password_length-container">
					<AnimatedInput
						handleChange={handleChange}
						value={passLen}
						label="length"
						type="number"
						min={1}
						max={10}
					/>
				</div>
				<CustomAnimatedBtn title="Generate" onClick={generatePass} />

				<OutputWithCopy outputText={passStr} fieldStyle="--password" />
			</div>
		</div>
	);
};

export default PasswordGenerator;
