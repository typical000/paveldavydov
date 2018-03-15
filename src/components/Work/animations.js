import TWEEN from 'tween.js'

/**
 * Helper module for separating layout of component
 * and animations.
 *
 * All animations by default cause side effects because they make
 * update on JSS 'sheet' object to set final values.
 *
 * TODO: If more animation will appear - find a way to make an
 * abstraction on top of them
 */
let animationFrame = null

// Initial and final data for project selection animation
const foregroundCoordsFrom = {x: 0}
const backgroundScaleFrom = {opacity: 0.05, scale: 0.6}
const backgroundScaleTo = {opacity: 1, scale: 1}
const backgroundGrayscaleFrom = {grayscale: 100}
const backgroundGrayscaleTo = {grayscale: 0}

const initialAnimatedStyleProps = {
  displaySliders: true,
  foregroundOffsetX: 0,
  backgroundGrayscale: 100,
  backgroundOpacity: 0.1,
  backgroundScale: 0.6,
}

/**
 * @param {number} time
 * @private
 */
const animate = (time) => {
  animationFrame = requestAnimationFrame(animate)
  TWEEN.update(time)
}

/**
 * @param {Object} sheet - JSS sheet object
 */
export const setInitialAnimatedStyleProps = (sheet) => {
  sheet.update(initialAnimatedStyleProps)
}

/**
 * @param {Object} settings
 * @param {Object} settings.sheet - JSS sheet object
 * @param {number} settings.slidesOffsetDistance - offset, where move slides
 * @returns {Promise}
 */
export const animateProjectSelection = ({sheet, slidesOffsetDistance}) =>
  new Promise((resolve) => {
    // Reset values due to mutations inside tweens animation process
    const foregroundCoords = {...foregroundCoordsFrom}
    const backgroundScale = {...backgroundScaleFrom}
    const backgroundGrayscale = {...backgroundGrayscaleFrom}

    // Start looper animation frame
    animationFrame = requestAnimationFrame(animate)

    // Move out slider out of screen
    const moveForegroundTween = new TWEEN.Tween(foregroundCoords)
      .to({x: slidesOffsetDistance}, 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        sheet.update({foregroundOffsetX: foregroundCoords.x})
      })
      // Stop animation loop here because this animation will finish last
      .onComplete(() => {
        cancelAnimationFrame(animationFrame)
        resolve()
      })

    // Make visible background slide
    const backgroundScaleTween = new TWEEN.Tween(backgroundScale)
      .to(backgroundScaleTo, 1000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() =>
        sheet.update({
          backgroundOpacity: backgroundScale.opacity,
          backgroundScale: backgroundScale.scale,
        }),
      )

    // Remove grayscale from slide
    const backgroundGrayscaleTween = new TWEEN.Tween(backgroundGrayscale)
      .to(backgroundGrayscaleTo, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() =>
        sheet.update({
          backgroundGrayscale: backgroundGrayscale.grayscale,
        }),
      )

    // Chain tweens. So grayscale will decrease only after
    // scale animation finish
    backgroundScaleTween.chain(backgroundGrayscaleTween)

    // Start all tweens
    moveForegroundTween.start()
    backgroundScaleTween.delay(100).start()
  })
