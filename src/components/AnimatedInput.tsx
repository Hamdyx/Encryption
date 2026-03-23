import type { FunctionComponent } from 'react';

interface Props {
	handleOnChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	value: number | string;
	label?: string;
	type?: 'text' | 'number' | 'textarea';
	min?: number;
	max?: number;
}

const AnimatedInput: FunctionComponent<Props> = ({
	handleOnChange,
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
					onChange={handleOnChange}
					required
				/>
			);
			break;
		case 'number':
			InputWrapper = (
				<input
					type="number"
					value={value}
					onChange={handleOnChange}
					min={min}
					max={max}
					required
				/>
			);
			break;

		default:
			InputWrapper = (
				<input type="text" value={value} onChange={handleOnChange} />
			);
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
