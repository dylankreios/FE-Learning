/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let rev = 0;
  for (let i = 0; i < 32 && n > 0; ++i) {
    rev |= (n & 1) << (31 - i);
    n >>>= 1; // n /= 2
  }
  return rev >>> 0;
};
