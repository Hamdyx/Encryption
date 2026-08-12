import { fireEvent, render, screen, within } from '@testing-library/react';

import PasswordGenerator from './index';

const CHARSET_LABELS = ['lowercase', 'uppercase', 'digits', 'symbols'];

const uncheck = (...labels: string[]) => {
	for (const label of labels) {
		fireEvent.click(screen.getByRole('checkbox', { name: label }));
	}
};

//* the output panel renders live regions of its own, so the hint is looked up
//* inside the character-type fieldset rather than across the whole page
const charsetHint = () =>
	within(screen.getByRole('group', { name: 'Character types' })).getByRole(
		'status'
	);

describe('PasswordGenerator', () => {
	it('generates a password of the requested length when Generate is clicked', () => {
		render(<PasswordGenerator />);

		fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

		expect(
			screen.getByLabelText('Generated password').textContent
		).toHaveLength(6);
	});

	it('labels the length field and the generated password', () => {
		render(<PasswordGenerator />);

		expect(screen.getByRole('spinbutton', { name: 'length' })).toHaveValue(
			6
		);
		expect(screen.getByLabelText('Generated password')).toBeInTheDocument();
	});

	it('offers every character type, all checked by default', () => {
		render(<PasswordGenerator />);

		for (const label of CHARSET_LABELS) {
			expect(screen.getByRole('checkbox', { name: label })).toBeChecked();
		}
		expect(screen.getAllByRole('checkbox')).toHaveLength(
			CHARSET_LABELS.length
		);
	});

	it('generates from the selected character types only', () => {
		render(<PasswordGenerator />);

		uncheck('uppercase', 'digits', 'symbols');
		fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

		expect(screen.getByLabelText('Generated password')).toHaveTextContent(
			/^[a-z]{6}$/
		);
	});

	it('disables Generate and explains why when no character type is selected', () => {
		render(<PasswordGenerator />);

		uncheck(...CHARSET_LABELS);

		expect(screen.getByRole('button', { name: 'Generate' })).toBeDisabled();
		expect(charsetHint()).toHaveTextContent(
			'Select at least one character type.'
		);
	});

	it('re-enables Generate once a character type is selected again', () => {
		render(<PasswordGenerator />);

		uncheck(...CHARSET_LABELS);
		fireEvent.click(screen.getByRole('checkbox', { name: 'digits' }));

		expect(screen.getByRole('button', { name: 'Generate' })).toBeEnabled();
		expect(charsetHint()).toBeEmptyDOMElement();
	});
});
