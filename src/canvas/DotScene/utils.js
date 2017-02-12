/* eslint-disable no-bitwise */

import {DEG_TO_RAD, RAD_TO_DEG} from 'pixi.js'

/**
 * Converts degrees to radians
 * @param {Number} Current degree
 * @return {Number} Converted degree to radians
 */
export const degToRad = deg => deg * DEG_TO_RAD

/**
 * Converts radians to degs
 * @param {Number} Current radians
 * @return {Number} Converted radians to degree
 */
export const radToDeg = rad => rad * RAD_TO_DEG

/**
 * Converts decimal number to HEX color
 * @param {Number} Current decimal value of color
 * @return {Number} Converted HEX color
 */
export const decToHex = (number) => {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1
  }
  return `#${number.toString(16).toUpperCase()}`
}

/**
 * Converts decimal number to RGBA color
 * @param {Number} Current decimal value of color
 * @param {Number} Opacity value (in interval from 0 up to 1)
 * @return {Number} Converted HEX color
 */
export const decToRgba = (number, opacity) => {
  const r = number >> 16
  const g = (number >> 8) & 0xFF
  const b = number & 0xFF

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Get random between A and B
 * @private
 * @return {Number} Random interval
 */
export const getRandomInterval = (min, max) => (Math.random() * (max - min)) + min

export default {
  degToRad,
  radToDeg,
  decToHex,
  decToRgba,
  getRandomInterval,
}
