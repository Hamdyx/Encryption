import type { FunctionComponent } from 'react';

import { useEffect, useRef, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';

interface Props {
	outputText: string;
	fieldStyle?: string;
}

type CopyStatus = 'idle' | 'copied' | 'failed';

const OutputWithCopy: FunctionComponent<Props> = ({
	outputText,
	fieldStyle,
}) => {
	const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
	const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined
	);

	useEffect(() => () => clearTimeout(hideTimeoutRef.current), []);

	const handleCopyOutput = async () => {
		let status: CopyStatus;
		try {
			await navigator.clipboard.writeText(outputText);
			status = 'copied';
		} catch {
			status = 'failed';
		}
		setCopyStatus(status);
		clearTimeout(hideTimeoutRef.current);
		hideTimeoutRef.current = setTimeout(() => setCopyStatus('idle'), 1000);
	};

	return (
		<div className={`output-container`}>
			<AiFillLock className="lock_icon" />
			<div className={`output-box ${fieldStyle ?? ''}`}>
				<div className="copy_container">
					<button
						type="button"
						className="copy_button"
						onClick={handleCopyOutput}
						disabled={!outputText}
					>
						<MdContentCopy className="copy_icon" />
					</button>
					<span
						className={`copy_text ${copyStatus === 'idle' ? '' : '--show'}`}
					>
						{copyStatus === 'failed'
							? 'Copy failed!'
							: 'Text Copied!'}
					</span>
				</div>

				{outputText}
			</div>
		</div>
	);
};

export default OutputWithCopy;
