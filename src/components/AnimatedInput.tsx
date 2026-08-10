import type { FunctionComponent } from 'react';

import { useId } from 'react';

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
	const inputId = useId();

	//* the stagger animation needs one element per character; those spans are
	//* hidden from assistive tech, which reads the plain label text instead
	const labelChars = [...label].map((char: string, i: number) => (
		<span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
			{char}
		</span>
	));

	let InputWrapper;
	switch (type) {
		case 'textarea':
			InputWrapper = (
				<textarea
					id={inputId}
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
					id={inputId}
					type="number"
					placeholder=" "
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
				<input
					id={inputId}
					type="text"
					placeholder=" "
					value={value}
					onChange={handleOnChange}
				/>
			);
			break;
	}

	return (
		<div className="animated_input">
			{InputWrapper}
			<label htmlFor={inputId}>
				<span className="visually-hidden">{label}</span>
				<span className="label_chars" aria-hidden="true">
					{labelChars}
				</span>
			</label>
		</div>
	);
};

export default AnimatedInput;
