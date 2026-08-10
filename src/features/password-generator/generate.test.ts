import {
	clampLength,
	generatePassword,
	MAX_LENGTH,
	MIN_LENGTH,
} from './generate';

describe('generatePassword', () => {
	it('returns exactly the requested length', () => {
		for (const len of [1, 6, 17, 32]) {
			expect(generatePassword(len)).toHaveLength(len);
		}
	});

	it('only produces printable ASCII 33..126', () => {
		const password = generatePassword(32);
		for (const char of password) {
			const code = char.codePointAt(0)!;
			expect(code).toBeGreaterThanOrEqual(33);
			expect(code).toBeLessThanOrEqual(126);
		}
	});

	it('produces different outputs on consecutive calls', () => {
		expect(generatePassword(32)).not.toBe(generatePassword(32));
	});

	it('clamps out-of-range and invalid lengths', () => {
		expect(generatePassword(-5)).toHaveLength(MIN_LENGTH);
		expect(generatePassword(0)).toHaveLength(MIN_LENGTH);
		expect(generatePassword(999)).toHaveLength(MAX_LENGTH);
		expect(generatePassword(Number.NaN)).toHaveLength(MIN_LENGTH);
	});
});

describe('clampLength', () => {
	it('clamps to 1..32 and defaults NaN to the minimum', () => {
		expect(clampLength(-5)).toBe(MIN_LENGTH);
		expect(clampLength(0)).toBe(MIN_LENGTH);
		expect(clampLength(6.9)).toBe(6);
		expect(clampLength(32)).toBe(MAX_LENGTH);
		expect(clampLength(999)).toBe(MAX_LENGTH);
		expect(clampLength(Number.NaN)).toBe(MIN_LENGTH);
	});
});
