import TWEEN from 'tween.js'

/**
 * Scroll down by one screen
 * @param {Object} DOM element
 */
export const scrollScreen = (container) => {
  const height = container.clientHeight
  new TWEEN.Tween({x: container.scrollTop})
    .to({x: height}, height * 4)
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(function() {
      // eslint-disable-line
      container.scrollTop = this.x
    })
    .start()
}

export default {
  scrollScreen,
}
