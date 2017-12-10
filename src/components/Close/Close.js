import React from 'react'
import {rotateZ} from 'css-functions'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'

const styles = (theme) => {
  const color = theme.text.default
  const size = 24
  const barWeight = 1

  return {
    close: {
      transition: transition('800ms'),
      transformOrigin: ['50%', '50%'],
      width: size,
      height: size,
      opacity: 0.7,
      position: 'relative',
    },
    hovered: {
      composes: '$close',
      transform: rotateZ(-180),
    },
    bar: {
      position: 'absolute',
      width: '100%',
      height: barWeight,
      top: '50%',
      left: 0,
      background: color
    },
    barFirst: {
      composes: '$bar',
      transform: rotateZ(45)
    },
    barSecond: {
      composes: '$bar',
      transform: rotateZ(-45)
    }
  }
}

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
