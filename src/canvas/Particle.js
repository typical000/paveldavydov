import {Graphics} from 'pixi.js'
import settings from './settings'

/**
 * Abstract animated particle figure class
 */
export default class AbstractParticle {
  /**
   * @param {number} x - center of circle on X
   * @param {number} y - center of circle on Y
   * @param {number} size
   * @param {boolean} animateClockwise - direction of animation
   */
  constructor(
    x = 0,
    y = 0,
    size = 10,
    lifetime = 2000,
    animateClockwise = true,
    parent = {width: 0, height: 0} // Container, where paticle will be animated
  ) {
    this.graphics = new Graphics()

    this.parent = {}
    this.size = size
    this.lifetime = lifetime

    this.animateClockwise = animateClockwise

    // TODO: Indicate, that it's used for collisions
    this.padding = 20

    this.setSizes(x, y, parent.width, parent.height)
    this.setAnimation()
  }

  /**
   * Draw figure and convert it to sprite
   */
  draw() {
    const {strokeWidth, strokeColor} = settings

    this.graphics.alpha = settings.particleOpacity
    this.graphics.lineStyle(strokeWidth, strokeColor)
    this.drawFigure()

    return this.graphics
  }

  /**
   * Don't perform any extra drawings.
   * Due to abstraction nature - just clean graphics and do nothing.
   * @abstract
   */
  drawFigure() {
    this.clear()
  }

  /**
   * Global method to set, and reset sizes about
   * center X/Y, width/height of rendering area
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  setSizes(x, y, width, height) {
    this.x = x
    this.y = y

    this.parent.width = width
    this.parent.height = height

    this.graphics.position.x = x
    this.graphics.position.y = y
    this.graphics.pivot.x = x
    this.graphics.pivot.y = y
  }

  /**
   * Set direction, velocity and other stuff for animation
   */
  setAnimation() {
    this.angle = Math.random() * Math.PI * 2
    this.speed = Math.random() * 200
    this.rotationSpeed = Math.random() * 0.02

    this.graphics.vx = (Math.cos(this.angle) * this.speed) / 60
    this.graphics.vy = (Math.sin(this.angle) * this.speed) / 60
  }

  /**
   * Main animation function.
   * Used inside requestAnimationFrame loop
   */
  animate() {
    const {rotationSpeed, padding} = this
    const {width, height} = this.parent

    this.graphics.rotation = this.animateClockwise ?
      this.graphics.rotation + rotationSpeed :
      this.graphics.rotation - rotationSpeed

    this.graphics.x += this.graphics.vx
    this.graphics.y += this.graphics.vy

    if (this.graphics.x > width + padding) {
      this.graphics.x -= width + (2 * padding)
    }
    if (this.graphics.x < -padding) {
      this.graphics.x += width + (2 * padding)
    }
    if (this.graphics.y > height + padding) {
      this.graphics.y -= height + (2 * padding)
    }
    if (this.graphics.y < -padding) {
      this.graphics.y += height + (2 * padding)
    }
  }

  /**
   * Clear fully particle from existing graphics
   */
  clear() {
    this.graphics.clear()
  }
}

/**
 * @class Circle
 * @classdesc Particle designed as circle
 */
export class Circle extends AbstractParticle {
  /**
   * @override
   */
  drawFigure() {
    const {graphics, x, y, size} = this
    const radius = size / 2

    graphics.drawCircle(x, y, radius)
  }
}

/**
 * @class Circle
 * @classdesc Particle designed as sqare
 */
export class Square extends AbstractParticle {
  /**
   * @override
   */
  drawFigure() {
    const {graphics, x, y, size} = this
    const radius = size / 2

    graphics.drawRect(x - radius, y - radius, size, size)
  }
}

/**
 * @class Circle
 * @classdesc Particle designed as triangle
 */
export class Triangle extends AbstractParticle {
  /**
   * @override
   */
  drawFigure() {
    const {graphics, x, y, size} = this
    const radius = size / 2

    graphics.drawPolygon([
      x,
      y - radius,
      x + radius,
      y + radius,
      x - radius,
      y + radius,
      x,
      y - radius
    ])
  }
}
