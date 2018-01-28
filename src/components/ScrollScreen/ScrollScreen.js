import React from 'react'
import PropTypes from 'prop-types'
import {rotateZ, translateY, multiple} from 'css-functions'
import {Arrow} from '../icons'
import {transition} from '../../utils/css'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  scroll: {
    letterSpacing: 2,
    textTransform: 'uppercase',
    font: {
      family: theme.typography.fontFamily,
      size: 18,
      weight: 'bold'
    },
    border: 0,
    outline: 0,
    padding: 0,
    margin: 0,
    background: 'transparent',
    cursor: 'pointer',
    color: theme.text.default,
    fill: theme.text.default,
    transformOrigin: ['100%', '100%'],
    transform: multiple(
      rotateZ(90),
      translateY('100%')
    ),
    transition: transition(1000),
    '&:hover': {
      paddingRight: 10
    }
  },
  text: {
    verticalAlign: 'middle'
  },
  icon: {
    paddingLeft: 20,
    display: 'inline-block',
    verticalAlign: 'middle',
    opacity: 0.5,
    height: 13,
    maxWidth: 'none',
  }
})

const ScrollScreen = ({onClick, classes, children}) => (
  <button className={classes.scroll} onClick={onClick}>
    <span className={classes.text}>
      {children}
    </span>
    <Arrow className={classes.icon} />
  </button>
)

ScrollScreen.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default injectSheet(styles)(ScrollScreen)
