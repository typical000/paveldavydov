/**
 * Abstract class for managing all things about container size
 */

export default class SizeManager {
  /**
   * Constructor
   * @param {Node} selector, from wich all sizes will be retrived
   */
  constructor(container) {
    this.container = container
    this.update()
  }

  /**
   * Update all data of instance
   * @public
   */
  update() {
    this.size = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight
    }

    this.center = {
      x: this.size.width / 2,
      y: this.size.height / 2
    }
  }

  /**
   * Get container width
   * @public
   * @return {number}
   */
  get width() {
    return this.size.width
  }

  /**
   * Container height
   * @public
   * @return {number}
   */
  get height() {
    return this.size.height
  }

}
