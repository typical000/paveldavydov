import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {capitalizeFirstLetter} from '../../utils/text'
import injectSheet from '../../utils/jss'
import styles from './styles'

/**
 * Animated site logo class
 */
class Logo extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    closed: PropTypes.bool,
  }

  /**
   * @param {string} part name (used by CSS)
   * @param {string} ring type (outer, middle, etc.)
   */
  renderRing(name, type) {
    const {classes} = this.props

    return (
      <div key={type} className={classes[`ring${type}`]}>
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
      <div key={name} className={classes[`part${name}`]}>
        <div className={classes[`container${name}`]}>
          {rings.map((type) =>
            this.renderRing(name, capitalizeFirstLetter(type)),
          )}
        </div>
      </div>
    )
  }

  render() {
    const {classes, closed} = this.props
    const parts = ['top', 'bottom']

    const logoClasses = cn(classes.logo, closed && classes.closed)

    return (
      <div className={logoClasses}>
        <div className={classes.title}>
          <div className={classes.name}>
            <div className={classes.textName}>Pavel Davydov</div>
          </div>
          <div className={classes.position}>
            <div className={classes.textPosition}>
              <div className={classes.switcher}>
                <div className={classes.text}>Web Developer</div>
                <div className={classes.text}>Web Designer</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.parts}>
          {parts.map((type) => this.renderPart(type))}
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(Logo)
