import {Graphics} from 'pixi.js'

/**
 * Single dot class
 */

export default class Dot {
  /**
   * Constructor
   * @param {Object} starting point. Pair of X and Y coordinates
   * @param {Object} ending point. Pair of X and Y coordinates
   * @param {number} radius from center of scene
   * @param {number} degree
   */
  constructor(position = {x: 0, y: 0}, r = 0, deg = 0) {
    this.graphic = new Graphics()
    this.position = position
    this.r = this.graphic.r = r
    this.deg = deg
  }
}
