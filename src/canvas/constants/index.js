import TWEEN from 'tween.js'

export default {
  RINGS_AMOUNT: 16,
  RING_DISPERSION_MULTIPLIER: 12, // Dispersion amount for rings

  PARTICLES_AMOUNT: 24,
  PARTICLE_OPACITY: 0.6,
  PARTICLE_SIZE: 10,
  PARTICLE_LIFETIME: 1000,
  PARTICLE_LIFETIME_OFFSET: 800, // Lifetime can be more or less by this value
  PARTICLE_SPEED: 70,
  PARTICLE_SPEED_OFFSET: 35,

  STROKE_WIDTH: 1,
  STROKE_COLOR: 0x515151,

  BACKGROUND_PRIMARY: 0x222222,
  BACKGROUND_PRIMARY_ACCENT: 0x333333,
  BACKGROUND_SECONDARY: 0x1a1a1a,
  BACKGROUND_SECONDARY_ACCENT: 0x2c2c2c,

  FOREGROUND_OPACITY: 0.4,

  // Done with && due to server side rendering, where 'gsap' creates infinite loop.
  // We need to compute this variable ONLY in browser
  ANIMATION_EASING: TWEEN.Easing.Quartic.InOut
}
