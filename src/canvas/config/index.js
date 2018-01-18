import TWEEN from 'tween.js'

export const strokeWidth = 1
export const strokeColor = 0x515151

export const backgroundPrimary = 0x222222
export const backgroundSecondary = 0x1a1a1a

export const backgroundPrimaryAccent = 0x333333
export const backgroundSecondaryAccent = 0x2c2c2c

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// TODO: Review and remove

export const rotationSpeed = 100000
export const minTimeout = 2000
export const maxTimeout = 6000
export const appearingSpeed = 2000
export const stoppedOpacityAmount = 0.3
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Done with && due to server side rendering, where 'gsap' creates infinite loop.
// We need to compute this variable ONLY in browser
export const itemsAnimateEasing = TWEEN.Easing.Quartic.InOut

export default {
  strokeWidth,
  strokeColor,
  backgroundPrimary,
  backgroundPrimaryAccent,
  backgroundSecondary,
  backgroundSecondaryAccent,
  rotationSpeed,
  minTimeout,
  maxTimeout,
  itemsAnimateEasing,
  appearingSpeed,
  stoppedOpacityAmount,
}
