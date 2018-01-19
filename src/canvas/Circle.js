import {Graphics} from 'pixi.js'
import settings from './settings'
import {getRandomArbitrary} from './utils/number'

/**
 * @param {number} coordinate
 */
const getDispersedPosition = (coordinate) => {
  const {circlesDispersion} = settings
  return coordinate + getRandomArbitrary(-circlesDispersion, circlesDispersion)
}

/**
 * Single animated circle class
 */
export default class Dot {
  /**
   * @param {number} x - center of circle on X
   * @param {number} y - center of circle on Y
   * @param {number} radius
   * @param {boolean} animateClockwise - direction of animation
   */
  constructor(x, y, radius, animateClockwise = true) {
    this.graphics = new Graphics()

    this.radius = radius
    this.animateClockwise = animateClockwise

    this.setCenter(x, y)
  }

  /**
   * Draw circle inside grapics
   */
  draw() {
    const {strokeWidth, strokeColor} = settings
    const {graphics, x, y, radius} = this

    graphics.lineStyle(strokeWidth, strokeColor)
    graphics.drawCircle(
      getDispersedPosition(x),
      getDispersedPosition(y),
      radius
    )

    return graphics
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  setCenter(x, y) {
    this.x = x
    this.y = y

    this.graphics.position.x = x
    this.graphics.position.y = y
    this.graphics.pivot.x = x
    this.graphics.pivot.y = y
  }

  /**
   * Rotate graphics by some amount.
   * Used inside requestAnimationFrame loop
   * @param {number} amount
   */
  rotate(amount = Math.random() * 0.01) {
    this.graphics.rotation = this.animateClockwise ?
      this.graphics.rotation + amount :
      this.graphics.rotation - amount
  }

  /**
   * Clear any possible already drawed graphics
   */
  clear() {
    this.graphics.clear()
  }
}
