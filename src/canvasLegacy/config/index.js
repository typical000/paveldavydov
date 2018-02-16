import TWEEN from 'tween.js'

export const edges = 16

export const strokeWidth = 1
export const strokeColor = 0xe2e2e2
export const strokeCurvedLine = 0xcfd2d8
export const strokeDirectLine = 0xc0c4ca

export const dotSize = 4
export const dotStrokeSize = 2
export const dotFill = 0xf9f9f9
export const dotStroke = 0x757575
export const backgroundColorPrimary = 0xf9f9f9
export const backgroundColorSecondary = 0xf3f3f3

export const rotationSpeed = 100000
export const minTimeout = 2000
export const maxTimeout = 6000
export const appearingSpeed = 2000
export const stoppedOpacityAmount = 0.3

// Done with && due to server side rendering, where 'gsap' creates infinite loop.
// We need to compute this variable ONLY in browser
export const itemsAnimateEasing = TWEEN.Easing.Quartic.InOut

export const startRadius = 40
export const minRadius = 30
export const maxRadius = 45

export const curveDistortion = 40

export default {
  edges,
  strokeWidth,
  strokeColor,
  strokeCurvedLine,
  strokeDirectLine,
  dotSize,
  dotStrokeSize,
  dotFill,
  dotStroke,
  backgroundColorPrimary,
  backgroundColorSecondary,
  rotationSpeed,
  minTimeout,
  maxTimeout,
  itemsAnimateEasing,
  appearingSpeed,
  stoppedOpacityAmount,
  startRadius,
  minRadius,
  maxRadius,
  curveDistortion,
}
