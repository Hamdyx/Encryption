export const MIN_LENGTH = 1;
export const MAX_LENGTH = 32;

/**
 * Which character classes a generated password may draw from.
 */
export interface PasswordOptions {
	lowercase: boolean;
	uppercase: boolean;
	digits: boolean;
	symbols: boolean;
}

/** Name of a single character class. */
export type CharsetName = keyof PasswordOptions;

/**
 * The character class alphabets. Their union is exactly the printable ASCII
 * range `'!'` (33) .. `'~'` (126) — every code point in that range belongs to
 * one and only one class.
 */
export const CHARSETS: Record<CharsetName, string> = {
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	digits: '0123456789',
	symbols: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
};

/** Class names in display order. */
export const CHARSET_NAMES = Object.keys(CHARSETS) as CharsetName[];

/** Every class enabled — what `generatePassword` uses when nothing is passed. */
export const DEFAULT_OPTIONS: PasswordOptions = {
	lowercase: true,
	uppercase: true,
	digits: true,
	symbols: true,
};

/**
 * Truncate `length` and clamp it into `MIN_LENGTH..MAX_LENGTH`; `NaN` (an empty
 * or unparseable input field) falls back to `MIN_LENGTH`.
 */
export const clampLength = (length: number): number =>
	Number.isNaN(length)
		? MIN_LENGTH
		: Math.min(Math.max(Math.trunc(length), MIN_LENGTH), MAX_LENGTH);

/**
 * `count` uniformly distributed integers in `0..bound - 1`.
 *
 * Bytes at or above the largest multiple of `bound` that fits in a byte are
 * rejected, so `byte % bound` stays uniform. `bound` must be in `1..256`, which
 * holds for every charset combination (94 characters at most) and for every
 * shuffle index (`MAX_LENGTH` at most).
 */
const randomIndices = (count: number, bound: number): number[] => {
	const rejectionBound = 256 - (256 % bound);
	const indices: number[] = [];
	while (indices.length < count) {
		const bytes = crypto.getRandomValues(
			new Uint8Array(count - indices.length)
		);
		for (const byte of bytes) {
			if (byte < rejectionBound) {
				indices.push(byte % bound);
			}
		}
	}
	return indices;
};

/** A single uniformly distributed integer in `0..bound - 1`. */
const randomIndex = (bound: number): number => randomIndices(1, bound)[0];

/** In-place Fisher-Yates shuffle driven by the same CSPRNG source. */
const shuffle = (chars: string[]): void => {
	for (let i = chars.length - 1; i > 0; i--) {
		const j = randomIndex(i + 1);
		[chars[i], chars[j]] = [chars[j], chars[i]];
	}
};

/**
 * The alphabets for the enabled classes. Selecting nothing is treated as
 * selecting everything, so the generator always has a pool to draw from.
 */
const selectedCharsets = (options: PasswordOptions): string[] => {
	const enabled = CHARSET_NAMES.filter((name) => options[name]);
	return (enabled.length > 0 ? enabled : CHARSET_NAMES).map(
		(name) => CHARSETS[name]
	);
};

/**
 * A cryptographically random password of `clampLength(length)` characters
 * drawn from the classes enabled in `options`.
 *
 * When the requested length leaves room for it, the password is guaranteed to
 * contain at least one character from each enabled class; the remainder is
 * drawn from the combined pool and the whole result is shuffled, so those
 * guaranteed characters keep no fixed position.
 */
export const generatePassword = (
	length: number,
	options: PasswordOptions = DEFAULT_OPTIONS
): string => {
	const target = clampLength(length);
	const charsets = selectedCharsets(options);
	const pool = charsets.join('');

	const chars: string[] = [];
	if (target >= charsets.length) {
		for (const charset of charsets) {
			chars.push(charset[randomIndex(charset.length)]);
		}
	}
	for (const index of randomIndices(target - chars.length, pool.length)) {
		chars.push(pool[index]);
	}
	shuffle(chars);

	return chars.join('');
};
