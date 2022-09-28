const { score } = require('./bowling-score');

describe('BowlingScore', () => {
  describe('score', () => {
    it.each([0, 5, 9, 11, 20])(
      "should throw an error if the game doesn't have 10 frames (here %d)",
      (length) => {
        expect(() => score(Array.from({ length }))).toThrowError();
      }
    );

    it.each`
      frame     | expected
      ${[0, 0]} | ${0}
      ${[1, 1]} | ${20}
      ${[2, 2]} | ${40}
      ${[1, 5]} | ${60}
    `(
      'should return $expected with frames where the player did 10 frames of $frame',
      ({ frame, expected }) => {
        const frames = Array.from({ length: 10 }, () => frame);
        expect(score(frames)).toBe(expected);
      }
    );

    it('should support spares', () => {
      const frames = [
        [1, 9],
        [1, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];

      expect(score(frames)).toBe(12);
    });

    it('should support spares even in last position', () => {
      const frames = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 9, 1],
      ];

      expect(score(frames)).toBe(11);
    });

    it('should support strikes', () => {
      const frames = [
        [10],
        [1, 2],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];

      expect(score(frames)).toBe(16);
    });

    it('should support strikes even in last frame', () => {
      const frames = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [10, 1, 2],
      ];

      expect(score(frames)).toBe(13);
    });

    it('should support following strikes', () => {
      const frames = [
        [10],
        [10],
        [1, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];

      expect(score(frames)).toBe(33);
    });

    it('should support all strikes', () => {
      const frames = [
        [10],
        [10],
        [10],
        [10],
        [10],
        [10],
        [10],
        [10],
        [10],
        [10, 10, 10],
      ];

      expect(score(frames)).toBe(300);
    });
  });
});
