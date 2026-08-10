import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
	it('renders the navbar with Home, Generator, and Cipher links', () => {
		render(<App />);

		expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Generator' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Cipher' })
		).toBeInTheDocument();
	});
});
