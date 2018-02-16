/* eslint-disable no-bitwise */

import {DEG_TO_RAD, RAD_TO_DEG, Texture} from 'pixi.js'

/**
 * Converts degrees to radians
 * @param {Number} Current degree
 * @return {Number} Converted degree to radians
 */
export const degToRad = (deg) => deg * DEG_TO_RAD

/**
 * Converts radians to degs
 * @param {Number} Current radians
 * @return {Number} Converted radians to degree
 */
export const radToDeg = (rad) => rad * RAD_TO_DEG

/**
 * Converts decimal number to HEX color
 * @param {Number} Current decimal value of color
 * @return {Number} Converted HEX color
 */
export const decToHex = (number) => {
  if (number < 0) {
    number = 0xffffffff + number + 1
  }
  return `#${number.toString(16).toUpperCase()}`
}

/**
 * Converts decimal number to RGBA color
 * @param {Number} Current decimal value of color
 * @param {Number} Opacity value (in interval from 0 up to 1)
 * @return {Number} Converted HEX color
 */
export const decToRgba = (number, opacity = 1) => {
  const r = number >> 16
  const g = (number >> 8) & 0xff
  const b = number & 0xff

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Draw radial gradient image
 * @param {Number} w - width of image
 * @param {Number} h - height of image
 * @param {Number} x - X position of gradient center
 * @param {Number} y - Y position of gradient center
 * @param {Number} color - decimal valued color
 * @param {Number} r0 - starting radius for gradient
 * @param {Number} r1 - ending radius for gradient
 * @return {Object} PIXI.Texture object of converted radial gradient from canvas
 */
export const getRadialGradientTexture = (
  w,
  h,
  x,
  y,
  color,
  r0 = 100,
  r1 = 300,
) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(x, y, r0, x, y, r1)

  // Set canvas size
  canvas.width = w
  canvas.height = h

  // Set gradient to block
  gradient.addColorStop(0, decToRgba(color, 1))
  gradient.addColorStop(1, decToRgba(color, 0))

  context.fillStyle = gradient
  context.fillRect(0, 0, w, h)

  return Texture.fromCanvas(canvas)
}

export default {
  degToRad,
  radToDeg,
  decToHex,
  decToRgba,
}
