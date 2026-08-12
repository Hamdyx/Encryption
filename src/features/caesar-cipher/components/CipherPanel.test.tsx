import { fireEvent, render, screen } from '@testing-library/react';

import CipherPanel from './CipherPanel';

const runPanel = (
	mode: 'encrypt' | 'decrypt',
	text: string,
	key: string
): string | null | undefined => {
	const { unmount } = render(<CipherPanel mode={mode} />);

	fireEvent.change(screen.getByRole('textbox', { name: `text to ${mode}` }), {
		target: { value: text },
	});
	fireEvent.change(screen.getByRole('spinbutton', { name: 'key' }), {
		target: { value: key },
	});
	fireEvent.click(
		screen.getByRole('button', {
			name: mode === 'encrypt' ? 'Encrypt' : 'Decrypt',
		})
	);

	const output = screen.getByLabelText(
		mode === 'encrypt' ? 'Encrypted text' : 'Decrypted text'
	).textContent;
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
		expect(runPanel('encrypt', 'abc', '')).toBe('');
	});

	it('accepts a key beyond the alphabet size', () => {
		expect(runPanel('encrypt', 'abc', '30')).toBe('efg');
	});

	it('accepts a key of 0', () => {
		expect(runPanel('encrypt', 'abc', '0')).toBe('abc');
	});

	it('accepts a key of 26', () => {
		expect(runPanel('encrypt', 'abc', '26')).toBe('abc');
	});

	it('accepts a negative key', () => {
		expect(runPanel('encrypt', 'abc', '-1')).toBe('zab');
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

describe('CipherPanel output clearing', () => {
	it('clears the output when the text or key is edited after transforming', () => {
		render(<CipherPanel mode="encrypt" />);

		fireEvent.change(
			screen.getByRole('textbox', { name: 'text to encrypt' }),
			{
				target: { value: 'abc' },
			}
		);
		fireEvent.change(screen.getByRole('spinbutton', { name: 'key' }), {
			target: { value: '1' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Encrypt' }));

		expect(screen.getByLabelText('Encrypted text').textContent).toBe('bcd');

		fireEvent.change(
			screen.getByRole('textbox', { name: 'text to encrypt' }),
			{
				target: { value: 'abcd' },
			}
		);

		expect(screen.getByLabelText('Encrypted text').textContent).toBe('');

		fireEvent.click(screen.getByRole('button', { name: 'Encrypt' }));
		expect(screen.getByLabelText('Encrypted text').textContent).toBe(
			'bcde'
		);

		fireEvent.change(screen.getByRole('spinbutton', { name: 'key' }), {
			target: { value: '2' },
		});

		expect(screen.getByLabelText('Encrypted text').textContent).toBe('');
	});
});

describe('Caesar cipher round trip', () => {
	it('decrypting an encrypted string with the same key returns the original text', () => {
		const original = 'Hello, World!';
		const encrypted = runPanel('encrypt', original, '5');

		expect(runPanel('decrypt', encrypted as string, '5')).toBe(original);
	});
});
