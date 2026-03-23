import type { FunctionComponent } from 'react';

import { useRef } from 'react';
import ReactGA from 'react-ga4';
import { AiFillLock } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';

interface Props {
	outputText: string;
	fieldStyle?: string;
}

const OutputWithCopy: FunctionComponent<Props> = ({
	outputText,
	fieldStyle,
}) => {
	const tooltipRef = useRef<HTMLSpanElement>(null);

	const handleCopyOutput = () => {
		globalThis.navigator.clipboard.writeText(outputText);
		tooltipRef?.current?.classList.add('--show');
		setTimeout(() => tooltipRef?.current?.classList.remove('--show'), 1000);
		ReactGA.event({
			category: 'Output',
			action: 'Copy Text',
		});
	};

	return (
		<div className={`output-container`}>
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
