import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
const CustomAnimatedBtn: React.FC<{ title: string; onClick: () => void }> = (
	props
) => {
	return (
		<button className="custom_animated-btn" onClick={props.onClick}>
			<div className="svg-wrapper-1">
				<div className="svg-wrapper">
					<svg viewBox="0 0 24 24" width="24" height="24">
						<AiFillSetting />
					</svg>
				</div>
			</div>
			<span>{props.title}</span>
		</button>
	);
};

export default CustomAnimatedBtn;
