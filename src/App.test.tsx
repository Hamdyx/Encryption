import { render, screen } from '@testing-library/react';

import App from './App';

afterEach(() => {
	window.history.pushState({}, '', '/');
});

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

	it('renders route content inside a main landmark with a single h1', () => {
		render(<App />);

		expect(screen.getByRole('main')).toBeInTheDocument();
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
	});

	it('renders NotFound with a link home on unknown routes', async () => {
		window.history.pushState({}, '', '/does-not-exist');
		render(<App />);

		expect(
			await screen.findByRole('heading', { name: 'Page Not Found' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Back to home' })
		).toBeInTheDocument();
	});
});
