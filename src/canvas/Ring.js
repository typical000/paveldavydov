import {Graphics} from 'pixi.js'
import settings from './settings'
import {getRandomArbitrary} from './utils/number'

/**
 * @param {number} coordinate
 */
const getDispersedPosition = (coordinate) => {
  const {ringDispersionMultiplier} = settings
  const amount = Math.floor(coordinate / ringDispersionMultiplier)
  return coordinate + getRandomArbitrary(-amount, amount)
}

/**
 * Single animated circle class
 */
export default class Ring {
  /**
   * @param {number} x - center of circle on X
   * @param {number} y - center of circle on Y
   * @param {number} radius
   * @param {boolean} animateClockwise - direction of animation
   */
  constructor(
    x = 0,
    y = 0,
    radius = 100,
    animateClockwise = true,
    animateSpeed = Math.random() * 0.02
  ) {
    this.graphics = new Graphics()

    this.radius = radius
    this.animateClockwise = animateClockwise
    this.animateSpeed = animateSpeed

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
   */
  animate() {
    this.graphics.rotation = this.animateClockwise ?
      this.graphics.rotation + this.animateSpeed :
      this.graphics.rotation - this.animateSpeed
  }

  /**
   * Clear any possible already drawed graphics
   */
  clear() {
    this.graphics.clear()
  }
}
