module.exports = {
  score,
};

function scoreFrame([a, b = 0, c = 0], nextFrame = [], nextNextFrame = [], isLastFrame) {
  let result = 0;

  result += a + b;

  if (a === 10 && isLastFrame) {
    // In case of STRIKE in the last frame
    // (We already added the bonus point of the second throw frame, only add the last throw)
    result += c;
  } else if (a === 10) {
    // In case of STRIKE, add the next two throws
    result += (nextFrame[0] || b) + (nextFrame[1] || nextNextFrame[0] || c);
  } else if (a + b === 10) {
    // In case of SPARE, add the next throw to the current frame score.
    result += nextFrame[0] || c;
  }

  return result;
}

/**
 * Return the score of the game.
 *
 * @param {number[][]} frames
 * @returns {number}
 */
function score(frames = []) {
  if (frames.length !== 10) {
    throw Error(
      `Mismatched number of frames. Expected: 10, Received: ${frames.length}`
    );
  }

  let total = 0;

  for (let i = 0; i < frames.length; i++) {
    total += scoreFrame(frames[i], frames[i + 1], frames[i + 2], i === 9);
  }

  return total;
}
