export const MIN_LENGTH = 1;
export const MAX_LENGTH = 32;

//* Printable ASCII: '!' (33) .. '~' (126)
const CHARSET_START = 33;
const CHARSET_SIZE = 94;
//* Largest multiple of CHARSET_SIZE that fits in a byte; values at or above
//* this are rejected so that byte % CHARSET_SIZE stays uniform.
const REJECTION_BOUND = 256 - (256 % CHARSET_SIZE);

export const clampLength = (length: number): number =>
	Number.isNaN(length)
		? MIN_LENGTH
		: Math.min(Math.max(Math.trunc(length), MIN_LENGTH), MAX_LENGTH);

export const generatePassword = (length: number): string => {
	const target = clampLength(length);
	const chars: string[] = [];
	while (chars.length < target) {
		const bytes = crypto.getRandomValues(
			new Uint8Array(target - chars.length)
		);
		for (const byte of bytes) {
			if (byte < REJECTION_BOUND) {
				chars.push(
					String.fromCodePoint(CHARSET_START + (byte % CHARSET_SIZE))
				);
			}
		}
	}
	return chars.join('');
};
