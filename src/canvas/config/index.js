import {Power4} from 'gsap'

export const edges = 16

export const strokeWidth = 1
export const strokeColor = 0xE2E2E2
export const strokeCurvedLine = 0xCFD2D8
export const strokeDirectLine = 0xC0C4CA

export const dotSize = 4
export const dotStrokeSize = 2
export const dotFill = 0xF9F9F9
export const dotStroke = 0x757575
export const backgroundColorPrimary = 0xF9F9F9
export const backgroundColorSecondary = 0xF3F3F3

export const rotationSpeed = 120
export const minTimeout = 2
export const maxTimeout = 6
export const appearingSpeed = 2
export const stoppedOpacityAmount = 0.3

// Done with && due to server side rendering, where 'gsap' creates infinite loop.
// We need to compute this variable ONLY in browser
export const itemsAnimateEasing = process.browser && Power4.easeInOut

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
  curveDistortion
}
