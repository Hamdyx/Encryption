import { fireEvent, render, screen } from '@testing-library/react';

import CipherPanel from './CipherPanel';

// TODO(a11y phase): AnimatedInput's <label> isn't associated with its input
// via htmlFor/id, so getByLabelText doesn't work here — falls back to
// container queries until that's fixed.
const runPanel = (
	mode: 'encrypt' | 'decrypt',
	text: string,
	key: string
): string | null | undefined => {
	const { container, unmount } = render(<CipherPanel mode={mode} />);
	const textArea = container.querySelector('textarea') as HTMLTextAreaElement;
	const keyInput = container.querySelector(
		'input[type="number"]'
	) as HTMLInputElement;

	fireEvent.change(textArea, { target: { value: text } });
	fireEvent.change(keyInput, { target: { value: key } });
	fireEvent.click(
		screen.getByRole('button', {
			name: mode === 'encrypt' ? 'Encrypt' : 'Decrypt',
		})
	);

	// .output-box also contains the (hidden) "Text Copied!" tooltip span as a
	// DOM sibling, so read the trailing text node rather than textContent.
	const output =
		container.querySelector('.output-box')?.lastChild?.textContent;
	unmount();
	return output;
};

describe('CipherPanel (encrypt)', () => {
	it('shifts letters by the key', () => {
		expect(runPanel('encrypt', 'abc', '1')).toBe('bcd');
	});

	it('wraps around the end of the alphabet', () => {
		expect(runPanel('encrypt', 'xyz', '3')).toBe('abc');
	});

	it('preserves case', () => {
		expect(runPanel('encrypt', 'AbC', '1')).toBe('BcD');
	});

	it('passes non-letters through unchanged', () => {
		expect(runPanel('encrypt', 'a b!', '1')).toBe('b c!');
	});

	it('does not crash on an empty key and lets the field be cleared', () => {
		expect(runPanel('encrypt', 'abc', '')).toBe('bcd');
	});
});

describe('CipherPanel (decrypt)', () => {
	it('shifts letters back by the key', () => {
		expect(runPanel('decrypt', 'bcd', '1')).toBe('abc');
	});

	it('wraps around the start of the alphabet', () => {
		expect(runPanel('decrypt', 'abc', '3')).toBe('xyz');
	});
});

describe('Caesar cipher round trip', () => {
	it('decrypting an encrypted string with the same key returns the original text', () => {
		const original = 'Hello, World!';
		const encrypted = runPanel('encrypt', original, '5');

		expect(runPanel('decrypt', encrypted as string, '5')).toBe(original);
	});
});
