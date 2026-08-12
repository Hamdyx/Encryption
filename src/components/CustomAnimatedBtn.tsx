import type { FunctionComponent } from 'react';

import { AiFillSetting } from 'react-icons/ai';

interface Props {
	title: string;
	onButtonClick: () => void;
	disabled?: boolean;
}

const CustomAnimatedBtn: FunctionComponent<Props> = ({
	title,
	onButtonClick,
	disabled = false,
}) => {
	return (
		<button
			type="button"
			className="custom_animated-btn"
			onClick={onButtonClick}
			disabled={disabled}
		>
			<span className="svg-wrapper">
				<AiFillSetting size={24} aria-hidden="true" />
			</span>
			<span className="btn_label">{title}</span>
		</button>
	);
};

export default CustomAnimatedBtn;
