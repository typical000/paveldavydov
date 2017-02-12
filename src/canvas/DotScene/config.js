import {Power4} from 'gsap'

export default {
  container: document.body,
  edges: 16,

  strokeWidth: 1,
  strokeColor: 0xE2E2E2,
  strokeCurvedLine: 0xCFD2D8,
  strokeDirectLine: 0xC0C4CA,

  dotSize: 4,
  dotStrokeSize: 2,
  dotFill: 0xF9F9F9,
  dotStroke: 0x757575,

  backgroundColorPrimary: 0xF9F9F9,
  backgroundColorSecondary: 0xF3F3F3,

  rotationSpeed: 120, // Rotations speed (in seconds) when item makes full rotation by 360 degs
  minTimeout: 2,
  maxTimeout: 6,
  itemsAnimateEasing: Power4.easeInOut, // Easing function for animations
  appearingSpeed: 2, // Speed, witch block take to became fully visible on start (in seconds)
  stoppedOpacityAmount: 0.3, // Amount of opaicty, when block have no playing animation

  startRadius: 40,
  minRadius: 30,
  maxRadius: 45,

  curveDistortion: 40
}
