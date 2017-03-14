import React, {PureComponent, PropTypes} from 'react'
import {TweenMax, Linear} from 'gsap'
import classnames from 'classnames'

import {capitalizeFirstLetter} from '../../utils/text'
import injectSheet from '../../utils/jss'
import styles from './styles'

/**
 * Animated site logo class
 */

class Logo extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.boolean
  }

  static getRingAnimation(isClockwise) {
    return {
      rotation: isClockwise ? 360 : -360,
      repeat: -1,
      ease: Linear.easeNone
    }
  }

  constructor(props) {
    super(props)
    this.ring = {}
  }

  componentDidMount() {
    // Initialize animation for each ring
    this.ring.outer = new TweenMax(
      [this.selectorTopOuter, this.selectorBottomOuter], 5, Logo.getRingAnimation(true)
    )

    this.ring.middle = new TweenMax(
      [this.selectorTopMiddle, this.selectorBottomMiddle], 5, Logo.getRingAnimation(false)
    )

    this.ring.inner = new TweenMax(
      [this.selectorTopInner, this.selectorBottomInner], 9, Logo.getRingAnimation(false)
    )

    // Set starting animation time scale
    this.setAnimationTimeScale(this.props.loading ? 1 : 0.2)
  }

  setAnimationTimeScale(scale) {
    TweenMax.to(
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
    const {classes, loading} = this.props
    const parts = ['top', 'bottom']

    // Set loading classes
    const logoClasses = classnames({
      [classes.logo]: true,
      [classes.logoLoading]: loading
    })

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
