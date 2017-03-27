import React, {PureComponent, PropTypes} from 'react'
import {TweenLite, Linear} from 'gsap'
import cn from 'classnames'

import {capitalizeFirstLetter} from '../../utils/text'
import injectSheet from '../../utils/jss'
import styles from './styles'

/**
 * Animated site logo class
 */

class Logo extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.boolean,
    closed: PropTypes.closed
  }

  static getRingAnimation(isClockwise) {
    return {
      // TweenLite doesn't support infinite loops.
      // So we multiply rotation amount (like 1000 rotations :))
      rotation: (isClockwise ? 360 : -360) * 1000,
      ease: Linear.easeNone
    }
  }

  constructor(props) {
    super(props)
    this.ring = {}
  }

  componentDidMount() {
    // Initialize animation for each ring
    this.ring.outer = new TweenLite(
      [this.selectorTopOuter, this.selectorBottomOuter], 5000, Logo.getRingAnimation(true)
    )

    this.ring.middle = new TweenLite(
      [this.selectorTopMiddle, this.selectorBottomMiddle], 5000, Logo.getRingAnimation(false)
    )

    this.ring.inner = new TweenLite(
      [this.selectorTopInner, this.selectorBottomInner], 9000, Logo.getRingAnimation(false)
    )

    // Set starting animation time scale
    this.setAnimationTimeScale(this.props.loading ? 1 : 0.2)
  }

  setAnimationTimeScale(scale) {
    TweenLite.to(
      [this.ring.outer, this.ring.middle, this.ring.inner], 1, {timeScale: scale}
    )
  }

  /**
   * @param {string} part name (used by CSS)
   * @param {string} ring type (outer, middle, etc.)
   */
  renderRing(name, type) {
    const {classes} = this.props

    return (
      <div
        className={classes[`ring${type}`]}
        ref={(ref) => {
          this[`selector${name}${type}`] = ref
        }}
      >
        <div className={classes.content} />
        <div className={classes.content} />
      </div>
    )
  }

  /**
   * @param {string} part name (user by CSS)
   */
  renderPart(name) {
    const {classes} = this.props
    const rings = ['outer', 'middle', 'inner']

    // Uppercase first letter
    name = capitalizeFirstLetter(name)

    return (
      <div className={classes[`part${name}`]}>
        <div className={classes[`container${name}`]}>
          {rings.map(type => this.renderRing(name, capitalizeFirstLetter(type)))}
        </div>
      </div>
    )
  }

  render() {
    const {classes, loading, closed} = this.props
    const parts = ['top', 'bottom']

    // Set loading classes
    const logoClasses = cn(classes.logo, (loading || closed) && classes.loading)

    // Set animation speed
    this.setAnimationTimeScale(loading ? 1 : 0.2)

    return (
      <div className={logoClasses}>
        <div className={classes.title}>
          <div className={classes.name}>
            <div className={classes.textName}>
              Pavel Davydov
            </div>
          </div>
          <div className={classes.position}>
            <div className={classes.textPosition}>
              <div className={classes.switcher}>
                <div className={classes.text}>
                  Web Developer
                </div>
                <div className={classes.text}>
                  Web Designer
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.parts}>
          {parts.map(type => this.renderPart(type))}
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(Logo)
