import type { FunctionComponent } from 'react';

import { useEffect, useRef, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';

interface Props {
	outputText: string;
	label: string;
	fieldStyle?: string;
}

type CopyStatus = 'idle' | 'copied' | 'failed';

const COPY_MESSAGE: Record<CopyStatus, string> = {
	idle: '',
	copied: 'Text Copied!',
	failed: 'Copy failed!',
};

const OutputWithCopy: FunctionComponent<Props> = ({
	outputText,
	label,
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
		<div className="output-container">
			<AiFillLock className="lock_icon" aria-hidden="true" />
			<div className={`output-box ${fieldStyle ?? ''}`}>
				<button
					type="button"
					className="copy_button"
					onClick={handleCopyOutput}
					disabled={!outputText}
					aria-label="Copy to clipboard"
				>
					<MdContentCopy aria-hidden="true" />
				</button>
				<span
					role="status"
					aria-live="polite"
					className={`copy_text ${copyStatus === 'idle' ? '' : '--show'}`}
				>
					{COPY_MESSAGE[copyStatus]}
				</span>

				<output aria-label={label}>{outputText}</output>
			</div>
		</div>
	);
};

export default OutputWithCopy;
