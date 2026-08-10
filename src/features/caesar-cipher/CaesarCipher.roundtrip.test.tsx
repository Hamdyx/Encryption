import { fireEvent, render, screen } from '@testing-library/react';

import CipherDecryption from './components/CipherDecryption';
import CipherEncryption from './components/CipherEncryption';

// TODO(a11y phase): AnimatedInput's <label> isn't associated with its input
// via htmlFor/id, so getByLabelText doesn't work here — falls back to
// container queries until that's fixed.
describe('Caesar cipher round trip', () => {
	it('decrypting an encrypted string with the same key returns the original text', () => {
		const original = 'Hello, World!';
		const key = 5;

		const encryption = render(<CipherEncryption />);
		const encryptTextArea = encryption.container.querySelector(
			'textarea'
		) as HTMLTextAreaElement;
		const encryptKeyInput = encryption.container.querySelector(
			'input[type="number"]'
		) as HTMLInputElement;

		fireEvent.change(encryptTextArea, { target: { value: original } });
		fireEvent.change(encryptKeyInput, { target: { value: String(key) } });
		fireEvent.click(screen.getByRole('button', { name: 'Encrypt' }));

		// .output-box also contains the (hidden) "Text Copied!" tooltip span as a
		// DOM sibling, so read the trailing text node rather than textContent.
		const encrypted = encryption.container.querySelector('.output-box')
			?.lastChild?.textContent as string;
		encryption.unmount();

		const decryption = render(<CipherDecryption />);
		const decryptTextArea = decryption.container.querySelector(
			'textarea'
		) as HTMLTextAreaElement;
		const decryptKeyInput = decryption.container.querySelector(
			'input[type="number"]'
		) as HTMLInputElement;

		fireEvent.change(decryptTextArea, { target: { value: encrypted } });
		fireEvent.change(decryptKeyInput, { target: { value: String(key) } });
		fireEvent.click(screen.getByRole('button', { name: 'Decrypt' }));

		const decrypted =
			decryption.container.querySelector('.output-box')?.lastChild
				?.textContent;

		expect(decrypted).toBe(original);
	});
});
