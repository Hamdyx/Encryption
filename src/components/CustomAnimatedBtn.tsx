import type { FunctionComponent } from 'react';

import { AiFillSetting } from 'react-icons/ai';

interface Props {
	title: string;
	onButtonClick: () => void;
}

const CustomAnimatedBtn: FunctionComponent<Props> = ({
	title,
	onButtonClick,
}) => {
	return (
		<button
			type="button"
			className="custom_animated-btn"
			onClick={onButtonClick}
		>
			<div className="svg-wrapper-1">
				<div className="svg-wrapper">
					<svg viewBox="0 0 24 24" width="24" height="24">
						<AiFillSetting aria-hidden="true" />
					</svg>
				</div>
			</div>
			<span>{title}</span>
		</button>
	);
};

export default CustomAnimatedBtn;
