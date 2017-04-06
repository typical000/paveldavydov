import React from 'react'

import injectSheet from '../../utils/jss'
import styles from './styles'

/**
 * Close icon
 * @param {boolean} is hovered or not
 * @param {Object} JSS sheet object
 */
const Close = ({hovered, classes}) => (
  <div className={hovered ? classes.hovered : classes.close}>
    <span className={classes.barFirst} />
    <span className={classes.barSecond} />
  </div>
)

Close.propTypes = {
  classes: React.PropTypes.object.isRequired,
  hovered: React.PropTypes.bool
}

export default injectSheet(styles)(Close)
