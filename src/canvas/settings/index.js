import TWEEN from 'tween.js'

export default {
  circlesAmount: 16,
  circlesDispersion: 50,

  strokeWidth: 1,
  strokeColor: 0x515151,

  backgroundPrimary: 0x222222,
  backgroundPrimaryAccent: 0x333333,
  backgroundSecondary: 0x1a1a1a,
  backgroundSecondaryAccent: 0x2c2c2c,

  foregroundOpacity: 0.4,

  // Done with && due to server side rendering, where 'gsap' creates infinite loop.
  // We need to compute this variable ONLY in browser
  animateEasing: TWEEN.Easing.Quartic.InOut
}
