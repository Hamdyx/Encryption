const ALPHABET_SIZE = 26;
const UPPER_A = 65;
const LOWER_A = 97;

const shiftWithinCase = (code: number, base: number, shift: number): number =>
	base +
	((((code - base + shift) % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE);

export const caesarShift = (text: string, shift: number): string => {
	let result = '';
	for (const char of text) {
		const code = char.codePointAt(0)!;
		if (code >= UPPER_A && code < UPPER_A + ALPHABET_SIZE) {
			result += String.fromCodePoint(
				shiftWithinCase(code, UPPER_A, shift)
			);
		} else if (code >= LOWER_A && code < LOWER_A + ALPHABET_SIZE) {
			result += String.fromCodePoint(
				shiftWithinCase(code, LOWER_A, shift)
			);
		} else {
			result += char;
		}
	}
	return result;
};
