/**
 * Get random between A and B
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const getRandomArbitrary = (min, max) => (Math.random() * (max - min)) + min

/**
 * @param {number} num
 * @returns {boolean}
 */
export const isEven = num => num % 2 === 0

export default {
  getRandomArbitrary,
  isEven
}
