/* eslint-disable */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'

const styles = {
  displayer: {
    position: 'relative',
  }
}

/**
 * Helper class for facilitating showing/hiding
 * of children elemenst with animation
 */
class AnimatedDisplayer extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {classes, children} = this.props

    return (
      <div className={classes.displayer}>
        {children}
      </div>
    )
  }
}

export default injectSheet(styles)(AnimatedDisplayer)
