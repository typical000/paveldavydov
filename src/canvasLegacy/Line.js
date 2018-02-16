import {Graphics} from 'pixi.js'

/**
 * Single line class that will be drawn on dot scene
 */

export default class Line {
  /**
   * Constructor
   * @param {Object} starting point. Pair of X and Y coordinates
   * @param {Object} ending point. Pair of X and Y coordinates
   */
  constructor(start = {x: 0, y: 0}, end = {x: 0, y: 0}) {
    // Set coordinates for starting and ending point as pairs of X and Y values
    this.start = start
    this.end = end

    this.graphic = new Graphics()
  }
}
