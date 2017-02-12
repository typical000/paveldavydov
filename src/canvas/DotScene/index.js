import {Container, Graphics, Texture, Sprite, utils as pixiUtils, autoDetectRenderer, PI_2} from 'pixi.js'
import {TweenLite, Power0} from 'gsap'

import Line from './Line'
import Dot from './Dot'
import SizeManager from './SizeManager'

import initialConfig from './config'
import {degToRad, decToRgba, getRandomInterval} from './utils'

export default class DotScene {
  constructor(config) {
    // Disable console pixi.js text about plugin
    pixiUtils.skipHello()

    // Extend default settings with passed ones
    this.settings = {...initialConfig, ...config}

    // Create instance for managing sizes
    this.sizeManager = new SizeManager(this.settings.container.parentNode)

    // Create renderer
    this.renderer = autoDetectRenderer(this.sizeManager.width, this.sizeManager.height, {
      transparent: true,
      forceFXAA: true,
      antialias: true,
      resolution: window.devicePixelRatio,
      view: this.settings.container
    })

    // Set right scene size take from screen size
    this.setSceneSize()
    this.setRadiuses()

    // Create root container that will hold the scene that we will draw in future
    this.stage = new Container()

    // Define collection of degreeses, lines and dots from number of edges
    this.dot = []
    this.line = []

    this.deg = []
    this.deg[0] = 0 // First is 0, in every solution
    for (let i = 1; i < this.settings.edges; i++) {
      this.deg[i] = this.deg[i - 1] + (360 / this.settings.edges)
    }

    // Create background and foreground scene objects
    this.backgroundGraphics = new Graphics()
    this.foregroundGraphics = new Graphics()

    // Make self-opaque on startup
    this.foregroundGraphics.alpha = this.settings.stoppedOpacityAmount

    this.drawBackground()
    this.drawForeground()

    // Internal contants
    this.curveDeformation = 360 / this.settings.edges / 4

    // Attach handlers and so on
    window.addEventListener('resize', this.resize.bind(this))
    window.addEventListener('orientationchange', this.resize.bind(this))

    requestAnimationFrame(this.redraw.bind(this))

    this.isAnimating = false
    this.isRotating = false

    this.start()
  }

  /**
   * Set default, minimal and maximal offset radius
   */
  setRadiuses() {
    this.startRadius = +this.setFigureRadius(this.settings.startRadius).toFixed(2)
    this.minRadius = +this.setFigureRadius(this.settings.minRadius).toFixed(2)
    this.maxRadius = +this.setFigureRadius(this.settings.maxRadius).toFixed(2)
  }

  /**
   * Set scene size function (used in resize and init processes)
   */
  setSceneSize() {
    const {width, height} = this.sizeManager.size

    this.renderer.view.style.width = `${width}px`
    this.renderer.view.style.height = `${height}px`
    this.renderer.resize(width, height)
  }

  /**
    * Set figure radius function (it is set default, minimal and maximal radiuses)
    * @param {Number} Multiplier value on what must be multiplied the original forumula
    */
  setFigureRadius(multiplier) {
    const {width, height} = this.sizeManager.size

    // Detect if this is mobile landscape mode
    if (height < 500) return (width / 100) * multiplier
    return (height / 100) * multiplier
  }

  /**
   * Get pair of X and Y coordinate from radius and angle
   * @param {Number} Radius from center of screen\viewport
   * @param {Number} Degree (take value from 0 up to 360)
   * @returns {Object[]} Pair of X and Y of real coordinates
   */
  getCoordinate(r, deg) {
    const {x, y} = this.sizeManager.center
    const rad = degToRad(deg)

    return {
      x: Math.round(x + (r * Math.cos(rad))),
      y: Math.round(y + (r * Math.sin(rad)))
    }
  }

  /**
   * Draw radial gradient image
   * @param {Number} Width of image
   * @param {Number} Height of image
   * @param {Number} X position of gradient center
   * @param {Number} Y position of gradient center
   * @param {Number} Size of gradient (in pixels)
   * @param {Number} Decimal valued color
   * @return {Object} PIXI.Texture object of converted radial gradient from canvas
   */
  static drawRadialGradient(width, height, posX, posY, color) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const gradient = context.createRadialGradient(posX, posY, 100, posX, posY, 300)

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Set gradient to block
    gradient.addColorStop(0, decToRgba(color, 1))
    gradient.addColorStop(1, decToRgba(color, 0))

    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)

    return Texture.fromCanvas(canvas)
  }

  /**
   * Draw background
   */
  drawBackground() {
    const {x, y} = this.sizeManager.center

    // Draw background blocks
    this.backgroundGraphics.beginFill(this.settings.backgroundColorPrimary)
    this.backgroundGraphics.drawRect(0, 0, x, y)
    this.backgroundGraphics.drawRect(x, y, x, y)

    this.backgroundGraphics.beginFill(this.settings.backgroundColorSecondary)
    this.backgroundGraphics.drawRect(0, y, x, y)
    this.backgroundGraphics.drawRect(x, 0, x, y)
    this.backgroundGraphics.endFill()

    // Draw radial circles on background
    this.backgroundGraphics.lineStyle(this.settings.strokeWidth, this.settings.strokeColor)
    this.backgroundGraphics.drawCircle(x, y, this.setFigureRadius(40))
    this.backgroundGraphics.drawCircle(x, y, this.setFigureRadius(60))
    this.backgroundGraphics.drawCircle(x, y, this.setFigureRadius(80))

    // Draw lines from center on background
    for (let i = 0; i < this.settings.edges; i++) {
      const lineTarget = this.getCoordinate(this.sizeManager.width, this.deg[i])
      // Set pointer to center of screen and draw line
      this.backgroundGraphics.moveTo(x, y)
      this.backgroundGraphics.lineTo(lineTarget.x, lineTarget.y)
    }

    let gradientOverlays

    // Add first gradient block
    gradientOverlays = new Sprite(
      DotScene.drawRadialGradient(x, y, x, y, this.settings.backgroundColorPrimary)
    )
    gradientOverlays.position.x = 0
    gradientOverlays.position.y = 0
    this.backgroundGraphics.addChild(gradientOverlays)

    // Add second gradient block
    gradientOverlays = new Sprite(
      DotScene.drawRadialGradient(x, y, 0, 0, this.settings.backgroundColorPrimary)
    )
    gradientOverlays.position.x = x
    gradientOverlays.position.y = y
    this.backgroundGraphics.addChild(gradientOverlays)

    // Add third gradient block
    gradientOverlays = new Sprite(
      DotScene.drawRadialGradient(x, y, 0, y, this.settings.backgroundColorSecondary)
    )
    gradientOverlays.position.x = x
    gradientOverlays.position.y = 0
    this.backgroundGraphics.addChild(gradientOverlays)

    // Add fourth gradient block
    gradientOverlays = new Sprite(
      DotScene.drawRadialGradient(x, y, x, 0, this.settings.backgroundColorSecondary)
    )
    gradientOverlays.position.x = 0
    gradientOverlays.position.y = y
    this.backgroundGraphics.addChild(gradientOverlays)

    // FInally, draw all on stage
    this.stage.addChild(this.backgroundGraphics)
  }

  /**
   * Draw foreground function
   */
  drawForeground() {
    const {x, y} = this.sizeManager.center

    // Place background on center of screen
    this.foregroundGraphics.position.x = x
    this.foregroundGraphics.position.y = y
    this.foregroundGraphics.pivot.x = x
    this.foregroundGraphics.pivot.y = y

    // Draw lines
    for (let i = 1; i < this.settings.edges + 1; i++) {
      const currentIndex = i - 1
      const start = this.getCoordinate(this.startRadius, this.deg[currentIndex])
      const end = this.getCoordinate(
        this.startRadius,
        i === this.settings.edges ? this.deg[0] : this.deg[i]
      )

      this.line[currentIndex] = new Line(start, end)
      this.foregroundGraphics.addChild(this.line[currentIndex].graphic)
    }

    // Draw dots
    for (let i = 0; i < this.settings.edges; i++) {
      const position = this.getCoordinate(this.startRadius, this.deg[i])
      this.dot[i] = new Dot(position, this.startRadius, this.deg[i])

      // Add dot to main graphics object
      this.foregroundGraphics.addChild(this.dot[i].graphic)
    }

    // At the end - draw all on stage
    this.stage.addChild(this.foregroundGraphics)
  }

  /**
   * Just handle resize resize
   */
  resize() {
    this.sizeManager.update()

    this.setRadiuses()
    this.setSceneSize()

    DotScene.clearStage(this.backgroundGraphics)
    DotScene.clearStage(this.foregroundGraphics)

    // Clear all dots and lines item created in precedent iteration
    // TODO: Check if really needed option
    for (let i = 0; i < this.settings.edges; i++) {
      this.dot[i].graphic.clear()
      this.line[i].graphic.clear()
    }

    this.drawBackground()
    this.drawForeground()
  }

  /**
   * Main redraw scene function
   */
  redraw() {
    // Refresh for each dot and line their positions
    for (let i = 1; i < this.settings.edges + 1; i++) {
      const prev = i - 1

      // Clear precedent lines from stage
      this.dot[prev].graphic.clear()
      this.line[prev].graphic.clear()

      // Draw dot
      this.dot[prev].graphic.beginFill(this.settings.dotFill)
      this.dot[prev].graphic.lineStyle(this.settings.dotStrokeSize, this.settings.dotStroke)
      this.dot[prev].graphic.drawCircle(
        this.dot[prev].position.x,
        this.dot[prev].position.y,
        this.settings.dotSize
      )

      // Update line coordinates
      this.line[prev].start.x = this.dot[prev].position.x + this.dot[prev].graphic.x
      this.line[prev].start.y = this.dot[prev].position.y + this.dot[prev].graphic.y

      // If there is end point - merge it with first one
      if (i === this.settings.edges) {
        this.line[prev].end.x = this.dot[0].position.x + this.dot[0].graphic.x
        this.line[prev].end.y = this.dot[0].position.y + this.dot[0].graphic.y
      }
      else {
        this.line[prev].end.x = this.dot[i].position.x + this.dot[i].graphic.x
        this.line[prev].end.y = this.dot[i].position.y + this.dot[i].graphic.y
      }

      // Set control points for curved lines
      const controlPoint = this.getCoordinate(
        this.dot[prev].graphic.r + this.settings.curveDistortion,
        this.deg[i - 1] + this.curveDeformation
      )
      const controlPoint2 = this.getCoordinate(
        this.dot[prev].graphic.r - this.settings.curveDistortion,
        (i === this.settings.edges ? this.deg[0] : this.deg[i]) - this.curveDeformation
      )

      // Draw lines
      this.line[prev].graphic.lineStyle(this.settings.strokeWidth, this.settings.strokeDirectLine)
      this.line[prev].graphic.moveTo(this.line[prev].start.x, this.line[prev].start.y)
      this.line[prev].graphic.lineTo(this.line[prev].end.x, this.line[prev].end.y)

      // Draw curves
      this.line[prev].graphic.lineStyle(this.settings.strokeWidth, this.settings.strokeCurvedLine)
      this.line[prev].graphic.moveTo(this.line[prev].start.x, this.line[prev].start.y)
      this.line[prev].graphic.bezierCurveTo(
        controlPoint.x,
        controlPoint.y,
        controlPoint2.x,
        controlPoint2.y,
        this.line[prev].end.x,
        this.line[prev].end.y
      )
    }

    // Main render call that makes pixi draw container and its children
    this.renderer.render(this.stage)
    requestAnimationFrame(this.redraw.bind(this))
  }

  /**
   * Full cleaning function for stage
   * @param {Object} PIXI.Graphics() object that must be fully cleared
   */
  static clearStage(stage) {
    for (let i = stage.children.length - 1; i >= 0; i--) {
      stage.removeChild(stage.children[i])
    }
  }

  /**
   * Starting method. Called on page & content load
   */
  start() {
    this.isRotating = true

    this.tweenRotate = new TweenLite(this.foregroundGraphics, this.settings.rotationSpeed, {
      rotation: PI_2, // Rotations degree, by 360 degs
      repeat: -1, // Make rotation repeat infinite times
      ease: Power0.easeNone // Linear easing
    })

    this.animateStart()
  }

  /**
   * Stop method. Created because if we have start it must be stop somewhere :)
   */
  stop() {
    this.isRotating = false

    this.tweenRotate.kill()
    this.animateStop()
  }

  /**
   * Toggle all animations and interactions
   */
  toggle() {
    if (this.isRotating) {
      this.stop()
    }
    else {
      this.start()
    }

    this.isRotating = !this.isRotating
  }

  /**
   * Infinite loop for random dots positions calculations
   * @param {Number} index of item
   * @param {Number} target X coordinate
   * @param {Number} target Y coordinate
   * @param {Number} target preffered radius
   */
  setDotTween(index, x, y, r) {
    this.dot[index].tween = TweenLite.to(
      this.dot[index].graphic,
      getRandomInterval(this.settings.minTimeout, this.settings.maxTimeout),
      {
        x: x - this.dot[index].position.x,
        y: y - this.dot[index].position.y,
        r, // Update radius with final one (needed for gracefull curves calculations)
        ease: this.settings.itemsAnimateEasing,
        overwrite: 'all',
        // Recursively call function in infinite loop
        onComplete: () => {
          const r = getRandomInterval(this.minRadius, this.maxRadius)
          const {x, y} = this.getCoordinate(r, this.dot[index].deg)
          this.setDotTween(index, x, y, r)
        }
      }
    )
  }

  /**
   * Start main animation. Used only on frontpage. Called through custom events
   */
  animateStart() {
    this.isAnimating = true

    // Make main object with full opaicty
    TweenLite.to(this.foregroundGraphics, this.settings.appearingSpeed, {
      alpha: 1,
      ease: this.settings.itemsAnimateEasing
    })

    // Create infinite loop for dots animations
    for (let i = 0; i < this.settings.edges; i++) {
      const r = this.dot[i].r
      const {x, y} = this.getCoordinate(this.dot[i].r, this.dot[i].deg)
      this.setDotTween(i, x, y, r)
    }
  }

  /**
   * Stop animation. Called through custom events too
   */
  animateStop() {
    this.isAnimating = false

    // Make main object with full opaicty
    TweenLite.to(this.foregroundGraphics, this.settings.appearingSpeed, {
      alpha: this.settings.stoppedOpacityAmount,
      ease: this.settings.itemsAnimateEasing
    })

    // Revert to starting point all running animations with dots
    // (lines will make the same because they are connected in redraw function)
    for (let i = 0; i < this.settings.edges; i++) {
      this.dot[i].tween = TweenLite.to(
        this.dot[i].graphic,
        getRandomInterval(this.settings.minTimeout, this.settings.maxTimeout),
        {
          x: 0,
          y: 0,
          r: this.startRadius,
          ease: this.settings.itemsAnimateEasing,
          overwrite: 'all'
        }
      )
    }
  }

  /**
   * Toggle animation. Called through custom events
   */
  animateToggle() {
    if (this.isAnimating) {
      this.animateStop()
    }
    else {
      this.animateStart()
    }

    this.isAnimating = !this.isAnimating
  }
}
