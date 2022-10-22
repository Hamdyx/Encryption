import React from 'react';

interface Props {
	handleChange: any;
	value: any;
	label?: any;
	type?: any;
	min?: number;
	max?: number;
}

const AnimatedInput: React.FC<Props> = ({
	handleChange,
	value,
	label = 'text',
	type = 'text',
	min = 1,
	max = 10,
}) => {
	const labelSpan = [...label].map((el: string, i: number) => (
		<span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
			{el}
		</span>
	));
	let InputWrapper;
	switch (type) {
		case 'textarea':
			InputWrapper = (
				<textarea
					placeholder=" "
					value={value}
					onChange={handleChange}
					required
				/>
			);
			break;
		case 'number':
			InputWrapper = (
				<input
					type="number"
					value={value}
					onChange={handleChange}
					min={min}
					max={max}
					required
				/>
			);
			break;

		default:
			<input type="text" value={value} onChange={handleChange} />;
			break;
	}
	return (
		<div className="animated_input">
			{InputWrapper}
			<label>{labelSpan}</label>
		</div>
	);
};

export default AnimatedInput;
