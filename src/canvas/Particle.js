import {Graphics} from 'pixi.js'
import constants from './constants'

const DEFAULT_SETTINGS = {
  x: 0,
  y: 0,
  size: 10,
  lifetime: 2000,
  angle: 0,
  speed: 100,
  rotationSpeed: 0.1,
  rotateClockwise: true,
  parent: {width: 0, height: 0} // Container, where paticle will be animated
}

/**
 * Abstract animated particle figure class
 */
export default class AbstractParticle {
  /**
   * @param {Object} settings
   */
  constructor(settings = DEFAULT_SETTINGS) {
    settings = Object.assign({}, DEFAULT_SETTINGS, settings)

    this.graphics = new Graphics()

    this.parent = {}
    this.size = settings.size
    this.lifetime = settings.lifetime
    this.currentLifetime = settings.lifetime

    this.angle = settings.angle
    this.speed = settings.speed
    this.rotationSpeed = settings.rotationSpeed
    this.rotateClockwise = settings.animateClockwise

    // TODO: Indicate, that it's used for collisions
    this.padding = 20

    this.setSizes(settings.x, settings.y, settings.parent.width, settings.parent.height)
    this.setAnimation()
  }

  /**
   * Draw figure and convert it to sprite
   */
  draw() {
    const {STROKE_WIDTH, STROKE_COLOR} = constants

    this.graphics.alpha = 0
    this.graphics.lineStyle(STROKE_WIDTH, STROKE_COLOR)
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
    // Set velocity
    this.graphics.vx = (Math.cos(this.angle) * this.speed) / 60
    this.graphics.vy = (Math.sin(this.angle) * this.speed) / 60

    // Set additional measurements for fading animation
    this.invisibleSize = Math.random() * (this.lifetime / 2) // Invisible part will be random
    this.fadeStageSize = Math.round(this.invisibleSize / 3) // Because there is 3 stages (see below)
    this.fadeStages = {
      invisible: this.invisibleSize,
      fadeIn: this.invisibleSize - this.fadeStageSize,
      fadeOut: this.fadeStageSize
    }
    this.opacityAmountPerFrame = constants.PARTICLE_OPACITY / this.fadeStageSize
  }

  /**
   * Main animation function.
   * Used inside requestAnimationFrame loop
   */
  animate() {
    const {rotationSpeed, padding} = this
    const {width, height} = this.parent

    // Rotate figure
    this.graphics.rotation = this.animateClockwise ?
      this.graphics.rotation + rotationSpeed :
      this.graphics.rotation - rotationSpeed

    // Move figure
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

    // Change opacity. Make like appear, and disappear animation
    this.currentLifetime--
    this.updateVisibility()

    if (this.currentLifetime <= 0) {
      // If time finish - restart all
      this.currentLifetime = this.lifetime
    }
  }

  /**
   * Update particle visiblity based on stage.
   * Can be invisible, fully visible or fading in/out
   */
  updateVisibility() {
    const {
      fadeStages,
      currentLifetime: time,
      opacityAmountPerFrame: amount
    } = this

    if (time >= fadeStages.invisible) {
      this.graphics.alpha = 0
      return
    }

    if (time >= fadeStages.fadeIn) {
      this.graphics.alpha += amount
      return
    }

    if (time <= fadeStages.fadeOut) {
      this.graphics.alpha -= amount
      return
    }

    this.graphics.alpha = constants.PARTICLE_OPACITY
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
