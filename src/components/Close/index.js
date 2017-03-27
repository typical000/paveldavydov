import React from 'react'

import injectSheet from '../../utils/jss'
import styles from './styles'

/**
 * Close icon
 * @param {boolean} is hovered or not
 * @param {Object} JSS sheet object
 */
const Close = ({hovered, classes}) => {
  return (
    <div className={hovered ? classes.hovered : classes.close}>
      <span className={classes.barFirst} />
      <span className={classes.barSecond} />
    </div>
  )
}

Close.propTypes = {
  hovered: React.PropTypes.bool,
  sheet: React.PropTypes.object
}

export default injectSheet(styles)(Close)
