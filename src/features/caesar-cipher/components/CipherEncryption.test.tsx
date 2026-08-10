import { fireEvent, render, screen } from '@testing-library/react';

import CipherEncryption from './CipherEncryption';

// TODO(a11y phase): AnimatedInput's <label> isn't associated with its input
// via htmlFor/id, so getByLabelText doesn't work here — falls back to
// container queries until that's fixed.
const encrypt = (text: string, key: number) => {
	const { container } = render(<CipherEncryption />);
	const textArea = container.querySelector('textarea') as HTMLTextAreaElement;
	const keyInput = container.querySelector(
		'input[type="number"]'
	) as HTMLInputElement;

	fireEvent.change(textArea, { target: { value: text } });
	fireEvent.change(keyInput, { target: { value: String(key) } });
	fireEvent.click(screen.getByRole('button', { name: 'Encrypt' }));

	// .output-box also contains the (hidden) "Text Copied!" tooltip span as a
	// DOM sibling, so read the trailing text node rather than textContent.
	return container.querySelector('.output-box')?.lastChild?.textContent;
};

describe('CipherEncryption', () => {
	it('shifts letters by the key', () => {
		expect(encrypt('abc', 1)).toBe('bcd');
	});

	it('wraps around the end of the alphabet', () => {
		expect(encrypt('xyz', 3)).toBe('abc');
	});

	it('preserves case', () => {
		expect(encrypt('AbC', 1)).toBe('BcD');
	});

	it('passes non-letters through unchanged', () => {
		expect(encrypt('a b!', 1)).toBe('b c!');
	});
});
