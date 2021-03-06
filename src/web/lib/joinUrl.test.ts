import { joinUrl } from './joinUrl';

const expectedOutput = 'http://example.com/abc/xyz';

describe('joinUrl', () => {
    it('prevents double slashes correctly', () => {
        const input = ['http://example.com/', '/abc/', '/xyz/'];

        expect(joinUrl(input)).toBe(expectedOutput);
    });

    it('adds slashes if none are present', () => {
        const input = ['http://example.com', 'abc', 'xyz'];

        expect(joinUrl(input)).toBe(expectedOutput);
    });

    it('deals with combinations of slash present and not', () => {
        const input = ['http://example.com/', 'abc/', '/xyz'];

        expect(joinUrl(input)).toBe(expectedOutput);
    });

    it('works with normal strings', () => {
        const input = ['/notadomain/', 'abc/', '/xyz'];

        expect(joinUrl(input)).toBe('notadomain/abc/xyz');
    });

    it('returns an empty string on empty input', () => {
        const input: string[] = [];

        expect(joinUrl(input)).toBe('');
    });
});
