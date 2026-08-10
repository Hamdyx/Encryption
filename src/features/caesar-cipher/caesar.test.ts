import { caesarShift } from './caesar';

describe('caesarShift', () => {
	it('round-trips for keys sampled across -30..60', () => {
		const text = 'The quick brown Fox, jumps over 13 lazy dogs!';
		for (const key of [
			-30, -26, -13, -1, 0, 1, 5, 13, 26, 27, 39, 52, 60,
		]) {
			expect(caesarShift(caesarShift(text, key), -key)).toBe(text);
		}
	});

	it('produces only letters for letter input with negative keys', () => {
		const shifted = caesarShift('abcXYZ', -5);
		expect(shifted).toMatch(/^[A-Za-z]+$/);
		expect(shifted).toBe('vwxSTU');
	});

	it('preserves case', () => {
		expect(caesarShift('AbC', 1)).toBe('BcD');
	});

	it('leaves non-letters and emoji unchanged', () => {
		expect(caesarShift('a 1! 🌟 b', 4)).toBe('e 1! 🌟 f');
	});

	it('is the identity for shifts of 0 and 26', () => {
		const text = 'Hello, World!';
		expect(caesarShift(text, 0)).toBe(text);
		expect(caesarShift(text, 26)).toBe(text);
	});
});
