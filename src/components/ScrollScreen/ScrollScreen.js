import React, {PropTypes} from 'react'
import {rotateZ, translateY, multiple} from 'css-functions'
import {Arrow} from '../icons'
import {transition} from '../../utils/css'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  scroll: {
    font: {
      family: theme.typography.fontFamily,
      size: theme.typography.fontSize
    },
    border: 0,
    outline: 0,
    padding: 0,
    margin: 0,
    background: 'transparent',
    cursor: 'pointer',
    transformOrigin: ['100%', '100%'],
    transform: multiple(
      rotateZ(90),
      translateY('100%')
    ),
    transition: transition(1000),
    color: theme.text.light,
    fill: theme.text.light,
    '&:hover': {
      color: theme.text.default,
      fill: theme.text.default,
      paddingRight: 10
    }
  },
  text: {
    verticalAlign: 'middle'
  },
  icon: {
    paddingLeft: 10,
    display: 'inline-block',
    verticalAlign: 'middle'
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
