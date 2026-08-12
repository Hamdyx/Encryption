const ALPHABET_SIZE = 26;
const UPPER_A = 65;
const LOWER_A = 97;

/**
 * Normalizes a raw shift value into the [0, 25] range expected by
 * {@link caesarShift}'s inner loop: truncates to an integer, then wraps it
 * into the alphabet via a mod-26 that's positive even for negative inputs.
 * `NaN` (e.g. from an unparseable key) normalizes to `0`.
 */
export const normalizeShift = (shift: number): number => {
	if (Number.isNaN(shift)) {
		return 0;
	}
	const truncated = Math.trunc(shift);
	return ((truncated % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
};

const shiftWithinCase = (code: number, base: number, shift: number): number =>
	base + ((code - base + shift) % ALPHABET_SIZE);

export const caesarShift = (text: string, shift: number): string => {
	const normalizedShift = normalizeShift(shift);
	let result = '';
	for (const char of text) {
		const code = char.codePointAt(0)!;
		if (code >= UPPER_A && code < UPPER_A + ALPHABET_SIZE) {
			result += String.fromCodePoint(
				shiftWithinCase(code, UPPER_A, normalizedShift)
			);
		} else if (code >= LOWER_A && code < LOWER_A + ALPHABET_SIZE) {
			result += String.fromCodePoint(
				shiftWithinCase(code, LOWER_A, normalizedShift)
			);
		} else {
			result += char;
		}
	}
	return result;
};
