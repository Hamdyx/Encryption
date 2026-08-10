import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OutputWithCopy from './OutputWithCopy';

const writeText = vi.fn();

beforeEach(() => {
	writeText.mockReset();
	Object.defineProperty(globalThis.navigator, 'clipboard', {
		value: { writeText },
		configurable: true,
	});
});

describe('OutputWithCopy', () => {
	it('disables the copy button when there is no output', () => {
		render(<OutputWithCopy outputText="" />);

		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('shows the success tooltip after a successful copy', async () => {
		writeText.mockResolvedValueOnce(undefined);
		const { container } = render(<OutputWithCopy outputText="secret" />);
		const button = screen.getByRole('button');
		expect(button).toBeEnabled();

		fireEvent.click(button);

		const tooltip = container.querySelector(
			'.copy_text'
		) as HTMLSpanElement;
		await waitFor(() => expect(tooltip).toHaveClass('--show'));
		expect(tooltip).toHaveTextContent('Text Copied!');
		expect(writeText).toHaveBeenCalledWith('secret');
	});

	it('shows a failure message, not success, when the clipboard write fails', async () => {
		writeText.mockRejectedValueOnce(new Error('denied'));
		const { container } = render(<OutputWithCopy outputText="secret" />);

		fireEvent.click(screen.getByRole('button'));

		const tooltip = container.querySelector(
			'.copy_text'
		) as HTMLSpanElement;
		await waitFor(() => expect(tooltip).toHaveClass('--show'));
		expect(tooltip).toHaveTextContent('Copy failed!');
		expect(tooltip).not.toHaveTextContent('Text Copied!');
	});
});
