import { fireEvent, render, screen } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
	it('exposes the native checkbox under its label', () => {
		render(<Checkbox label="symbols" checked onCheckedChange={vi.fn()} />);

		expect(screen.getByRole('checkbox', { name: 'symbols' })).toBeChecked();
	});

	it('reports the next checked state when toggled', () => {
		const onCheckedChange = vi.fn();
		render(
			<Checkbox
				label="digits"
				checked={false}
				onCheckedChange={onCheckedChange}
			/>
		);

		fireEvent.click(screen.getByRole('checkbox', { name: 'digits' }));

		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});

	it('toggles from a click on the label', () => {
		const onCheckedChange = vi.fn();
		render(
			<Checkbox
				label="digits"
				checked
				onCheckedChange={onCheckedChange}
			/>
		);

		fireEvent.click(screen.getByText('digits'));

		expect(onCheckedChange).toHaveBeenCalledWith(false);
	});

	it('gives each instance its own id', () => {
		render(
			<>
				<Checkbox label="digits" checked onCheckedChange={vi.fn()} />
				<Checkbox label="symbols" checked onCheckedChange={vi.fn()} />
			</>
		);

		expect(screen.getByRole('checkbox', { name: 'digits' }).id).not.toBe(
			screen.getByRole('checkbox', { name: 'symbols' }).id
		);
	});
});
