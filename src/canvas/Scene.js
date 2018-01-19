import {Container, Graphics, Sprite, filters as pixiFilters, utils as pixiUtils, autoDetectRenderer} from 'pixi.js'
import TWEEN from 'tween.js'
import SizeManager from './SizeManager'
import Circle from './Circle'
import settings from './settings'
import {getRadialGradientTexture} from './utils/color'
import {isEven} from './utils/number'

export default class Scene {

  /**
   * @param {Object} container - DOM node where mount scene
   */
  constructor(container) {
    // Disable console pixi.js text about plugin
    pixiUtils.skipHello()

    // Create instance for managing sizes
    this.sizeManager = new SizeManager(container.parentNode)

    // Create renderer
    this.renderer = autoDetectRenderer(this.sizeManager.width, this.sizeManager.height, {
      transparent: true,
      forceFXAA: true,
      antialias: true,
      resolution: window.devicePixelRatio,
      view: container,
    })

    // Set right scene size take from screen size
    this.setSceneSize()

    // Create root container that will hold the scene that we will draw in future
    this.stage = new Container()

    // Create background and foreground scene objects
    this.backgroundGraphics = new Graphics()
    this.foregroundGraphics = new Graphics()

    // Make self-opaque on startup
    this.foregroundGraphics.alpha = settings.foregroundOpacity

    this.circle = []

    this.initForeground()

    this.drawBackground()
    this.drawForeground()

    // Attach handlers and so on
    window.addEventListener('resize', this.resize.bind(this))
    window.addEventListener('orientationchange', this.resize.bind(this))

    requestAnimationFrame(this.redraw.bind(this))

    this.isAnimating = false

    this.start()
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
   * Getter for background scheme drawing
   * @see drawBackground
   * @returns {Object}
   */
  get backgroundScheme() {
    const {x, y} = this.sizeManager.center
    const {
      backgroundPrimary,
      backgroundSecondary,
      backgroundPrimaryAccent,
      backgroundSecondaryAccent
    } = settings

    return [{
      fill: backgroundPrimary,
      rect: [0, 0, x, y],
      overlayFill: backgroundPrimaryAccent,
      overlayRect: [x, y, x, y],
    }, {
      fill: backgroundPrimary,
      rect: [x, y, x, y],
      overlayFill: backgroundPrimaryAccent,
      overlayRect: [x, y, 0, 0],
    }, {
      fill: backgroundSecondary,
      rect: [x, 0, x, y],
      overlayFill: backgroundSecondaryAccent,
      overlayRect: [x, y, 0, y],

    }, {
      fill: backgroundSecondary,
      rect: [0, y, x, y],
      overlayFill: backgroundSecondaryAccent,
      overlayRect: [x, y, x, 0],
    }]
  }

  /**
   * Add any possible shaders (filters) to background.
   * I must say this: "LETS MAKE SOME NOISE!" :)
   */
  applyBackroundFilters() {
    const {NoiseFilter} = pixiFilters

    if (!this.backgroundFilter) {
      this.backgorundFilter = new NoiseFilter()
      this.backgorundFilter.noise = 0.25
    }

    this.backgroundGraphics.filters = [this.backgorundFilter]
  }

  /**
   * Draw background
   */
  drawBackground() {
    const graphics = this.backgroundGraphics

    this.backgroundScheme.forEach((scheme) => {
      // Draw background rect
      graphics.beginFill(scheme.fill)
      graphics.drawRect(
        scheme.rect[0],
        scheme.rect[1],
        scheme.rect[2],
        scheme.rect[3]
      )
      graphics.endFill()

      // Add overlay
      const overlay = new Sprite(
        getRadialGradientTexture(
          scheme.overlayRect[0],
          scheme.overlayRect[1],
          scheme.overlayRect[2],
          scheme.overlayRect[3],
          scheme.overlayFill,
          150,
          500
        )
      )
      overlay.position.x = scheme.rect[0]
      overlay.position.y = scheme.rect[1]
      graphics.addChild(overlay)
    })

    this.applyBackroundFilters()

    // FInally, draw all on stage
    this.stage.addChild(graphics)
  }

  /**
   * Draw foreground function
   */
  drawForeground() {
    const graphics = this.foregroundGraphics

    this.circle.forEach((circle) => {
      graphics.addChild(circle.draw())
    })

    // At the end - draw all on stage
    this.stage.addChild(graphics)
  }

  /**
   * Init foreground elements such as animated circles
   */
  initForeground() {
    const {x, y} = this.sizeManager.center
    const {width, height} = this.sizeManager
    const radius = Math.floor(((width > height ? height : width) / 2) * 0.95)

    for (let i = 0; i < settings.circlesAmount; i++) {
      this.circle[i] = new Circle(x, y, radius, isEven(i))
    }
  }

  /**
   * Set center of coordinates
   * Needed to avoid offseting foreground on resize away from screen
   */
  setForegroundCenter() {
    const {x, y} = this.sizeManager.center
    this.circle.forEach(circle => circle.setCenter(x, y))
  }

  /**
   * Just handle resize resize
   */
  resize() {
    this.sizeManager.update()
    this.setSceneSize()

    Scene.clearStage(this.backgroundGraphics)
    Scene.clearStage(this.foregroundGraphics)

    this.circle.forEach(circle => circle.clear())

    this.setForegroundCenter()
    this.drawBackground()
    this.drawForeground()
  }

  /**
   * Main redraw scene function
   */
  redraw() {
    // TODO: We need tweens in this case?
    TWEEN.update()

    // Make noise animated
    this.backgorundFilter.seed = Math.random() / 10

    // Rotate circles
    this.circle.forEach(circle => circle.rotate())

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
   * Start main animation. Used only on frontpage. Called through custom events
   */
  start() {
    this.isAnimating = true
  }

  /**
   * Stop animation. Called through custom events too
   */
  stop() {
    this.isAnimating = false
  }

  /**
   * Toggle animation. Called through custom events
   */
  toggle() {
    if (this.isAnimating) this.animateStop()
    else this.animateStart()

    this.isAnimating = !this.isAnimating
  }
}
