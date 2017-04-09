import React from 'react'

import {Arrow} from '../icons'

import injectSheet from '../../utils/jss'
import styles from './styles'


const ScrollScreen = (props) => {
  const {
    onClick,
    classes,
    children
  } = props

  return (
    <button className={classes.scroll} onClick={onClick}>
      <span className={classes.text}>
        {children}
      </span>
      <Arrow className={classes.icon} />
    </button>
  )
}

ScrollScreen.propTypes = {
  classes: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired
}

export default injectSheet(styles)(ScrollScreen)
