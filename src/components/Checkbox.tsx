import type { FunctionComponent } from 'react';

import { useId } from 'react';

interface Props {
	label: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}

const Checkbox: FunctionComponent<Props> = ({
	label,
	checked,
	onCheckedChange,
}) => {
	const inputId = useId();

	return (
		<div className="checkbox">
			<input
				id={inputId}
				type="checkbox"
				checked={checked}
				onChange={(event) => onCheckedChange(event.target.checked)}
			/>
			<label htmlFor={inputId}>{label}</label>
		</div>
	);
};

export default Checkbox;
