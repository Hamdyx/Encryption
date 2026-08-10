import { fireEvent, render, screen } from '@testing-library/react';

import PasswordGenerator from './index';

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
});
