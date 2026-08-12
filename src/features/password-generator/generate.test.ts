import type { CharsetName, PasswordOptions } from './generate';

import {
	CHARSET_NAMES,
	CHARSETS,
	clampLength,
	generatePassword,
	MAX_LENGTH,
	MIN_LENGTH,
} from './generate';

const NONE: PasswordOptions = {
	lowercase: false,
	uppercase: false,
	digits: false,
	symbols: false,
};

const only = (...names: CharsetName[]): PasswordOptions => {
	const options = { ...NONE };
	for (const name of names) options[name] = true;
	return options;
};

const classesIn = (password: string): Set<CharsetName> => {
	const found = new Set<CharsetName>();
	for (const char of password) {
		for (const name of CHARSET_NAMES) {
			if (CHARSETS[name].includes(char)) found.add(name);
		}
	}
	return found;
};

describe('CHARSETS', () => {
	it('partitions printable ASCII 33..126 exactly', () => {
		const union = CHARSET_NAMES.map((name) => CHARSETS[name]).join('');
		const expected = Array.from({ length: 94 }, (_, i) =>
			String.fromCodePoint(33 + i)
		);

		expect(union).toHaveLength(94);
		expect(new Set(union).size).toBe(94);
		expect([...union].sort()).toEqual(expected.sort());
	});
});

describe('generatePassword', () => {
	it('returns exactly the requested length', () => {
		for (const len of [1, 6, 17, 32]) {
			expect(generatePassword(len)).toHaveLength(len);
		}
	});

	it('returns exactly the requested length for any option combination', () => {
		const combos: PasswordOptions[] = [
			only('lowercase'),
			only('uppercase'),
			only('digits'),
			only('symbols'),
			only('lowercase', 'digits'),
			only('uppercase', 'symbols'),
			only('lowercase', 'uppercase', 'digits'),
			only('lowercase', 'uppercase', 'digits', 'symbols'),
			NONE,
		];
		for (const combo of combos) {
			for (const len of [1, 2, 3, 6, 32]) {
				expect(generatePassword(len, combo)).toHaveLength(len);
			}
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

	it('only draws from the selected classes', () => {
		for (const name of CHARSET_NAMES) {
			const password = generatePassword(32, only(name));
			for (const char of password) {
				expect(CHARSETS[name]).toContain(char);
			}
		}

		const password = generatePassword(32, only('lowercase', 'digits'));
		for (const char of password) {
			expect(CHARSETS.lowercase + CHARSETS.digits).toContain(char);
		}
	});

	it('includes at least one character from every selected class', () => {
		//* four characters is the tightest length that can still satisfy all
		//* four classes, so it is the case most likely to regress
		for (let run = 0; run < 50; run++) {
			expect(classesIn(generatePassword(4))).toEqual(
				new Set(CHARSET_NAMES)
			);
			expect(
				classesIn(generatePassword(2, only('digits', 'symbols')))
			).toEqual(new Set(['digits', 'symbols']));
		}
	});

	it('does not park the guaranteed characters at fixed positions', () => {
		//* an unshuffled implementation would always start with a lowercase
		//* character, since lowercase is the first selected class
		const firsts = new Set(
			Array.from({ length: 50 }, () => {
				const first = generatePassword(4)[0];
				return CHARSET_NAMES.find((name) =>
					CHARSETS[name].includes(first)
				);
			})
		);

		expect(firsts.size).toBeGreaterThan(1);
	});

	it('skips the class guarantee when the length cannot fit every class', () => {
		expect(generatePassword(2)).toHaveLength(2);
		expect(generatePassword(1, only('lowercase', 'uppercase'))).toMatch(
			/^[a-zA-Z]$/
		);
	});

	it('falls back to every class when nothing is selected', () => {
		for (let run = 0; run < 20; run++) {
			expect(classesIn(generatePassword(32, NONE))).toEqual(
				new Set(CHARSET_NAMES)
			);
		}
	});

	it('defaults to every class when no options are passed', () => {
		for (let run = 0; run < 20; run++) {
			expect(classesIn(generatePassword(32))).toEqual(
				new Set(CHARSET_NAMES)
			);
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
