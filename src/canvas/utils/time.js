/**
 * Get random between A and B
 * @private
 * @return {Number} Random interval
 */
export const getRandomInterval = (min, max) => (Math.random() * (max - min)) + min

export default {
  getRandomInterval
}