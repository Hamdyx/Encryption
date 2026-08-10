import { fireEvent, render, screen } from '@testing-library/react';

import PasswordGenerator from './index';

describe('PasswordGenerator', () => {
	it('generates a password of the requested length when Generate is clicked', () => {
		const { container } = render(<PasswordGenerator />);

		fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

		// .output-box also contains the (hidden) "Text Copied!" tooltip span as a
		// DOM sibling, so read the trailing text node rather than textContent.
		const output = container.querySelector('.output-box');
		expect(output?.lastChild?.textContent).toHaveLength(6);
	});
});
