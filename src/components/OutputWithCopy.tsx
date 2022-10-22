import React, { useRef } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';

const OutputWithCopy: React.FC<{
	title: string;
	outputText: string;
	fieldStyle?: string;
}> = ({ title, outputText, fieldStyle }) => {
	const tooltipRef = useRef<HTMLSpanElement>(null);

	const handleCopyOutput = (ev: any) => {
		window.navigator.clipboard.writeText(outputText);
		tooltipRef?.current?.classList.add('--show');
		setTimeout(() => tooltipRef?.current?.classList.remove('--show'), 1000);
	};

	return (
		<div className={`output-container`}>
			{/* <h3>{title}</h3> */}
			<AiFillLock className="lock_icon" />
			<div className={`output-box ${fieldStyle ?? ''}`}>
				<div className="copy_container">
					<button className="copy_button" onClick={handleCopyOutput}>
						<MdContentCopy className="copy_icon" />
					</button>
					<span className="copy_text" ref={tooltipRef}>
						Text Copied!
					</span>
				</div>

				{outputText}
			</div>
		</div>
	);
};

export default OutputWithCopy;
