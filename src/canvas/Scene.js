import {Container, Graphics, Texture, Sprite, utils as pixiUtils, autoDetectRenderer, PI_2} from 'pixi.js'
import TWEEN from 'tween.js'

import Line from './Line'
import Dot from './Dot'
import SizeManager from './SizeManager'

import initialConfig from './config'
import {degToRad, decToRgba, getRadialGradientTexture} from './utils/color'
import {getRandomInterval} from './utils/time'

export default class Scene {
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

    // Create root container that will hold the scene that we will draw in future
    this.stage = new Container()

    // Create background and foreground scene objects
    this.backgroundGraphics = new Graphics()
    this.foregroundGraphics = new Graphics()

    // Make self-opaque on startup
    this.foregroundGraphics.alpha = this.settings.stoppedOpacityAmount

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

    return [{
      fill: this.settings.backgroundPrimary,
      rect: [0, 0, x, y],
      overlayFill: this.settings.backgroundPrimaryAccent,
      overlayRect: [x, y, x, y],
    }, {
      fill: this.settings.backgroundPrimary,
      rect: [x, y, x, y],
      overlayFill: this.settings.backgroundPrimaryAccent,
      overlayRect: [x, y, 0, 0],
    }, {
      fill: this.settings.backgroundSecondary,
      rect: [x, 0, x, y],
      overlayFill: this.settings.backgroundSecondaryAccent,
      overlayRect: [x, y, 0, y],

    }, {
      fill: this.settings.backgroundSecondary,
      rect: [0, y, x, y],
      overlayFill: this.settings.backgroundSecondaryAccent,
      overlayRect: [x, y, x, 0],
    }]
  }

  /**
   * Draw background
   */
  drawBackground() {
    this.backgroundScheme.forEach((scheme) => {
      // Draw background rect
      this.backgroundGraphics.beginFill(scheme.fill)
      this.backgroundGraphics.drawRect(
        scheme.rect[0],
        scheme.rect[1],
        scheme.rect[2],
        scheme.rect[3]
      )
      this.backgroundGraphics.endFill()

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
      this.backgroundGraphics.addChild(overlay)
    });

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

    // At the end - draw all on stage
    this.stage.addChild(this.foregroundGraphics)
  }

  /**
   * Just handle resize resize
   */
  resize() {
    this.sizeManager.update()
    this.setSceneSize()

    Scene.clearStage(this.backgroundGraphics)
    Scene.clearStage(this.foregroundGraphics)

    this.drawBackground()
    this.drawForeground()
  }

  /**
   * Main redraw scene function
   */
  redraw() {

    TWEEN.update()

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
