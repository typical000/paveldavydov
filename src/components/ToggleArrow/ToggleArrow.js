import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {rotateZ, translate, translateX, multiple} from 'css-functions'
import {Arrow} from '../icons'
import {transition} from '../../utils/css'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  toggler: {
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
    transition: transition(1000),
    // '&:hover': {
    //   paddingRight: 10
    // }
  },
  text: {
    verticalAlign: 'middle'
  },
  arrow: {
    display: 'inline-block',
    verticalAlign: 'middle',
    opacity: 0.5,
    '&:first-child': {
      paddingRight: 20,
      '& $icon': {
        transform: rotateZ(180),
      },
    },
    '&:last-child': {
      paddingLeft: 20,
    },
  },
  icon: {
    height: 13,
    maxWidth: 'none',
  },

  // Directions
  up: {
    transformOrigin: ['100%', 0],
    transform: multiple(
      translate('-100%', 0),
      rotateZ(-90)
    ),
    '&:hover': {
      transform: multiple(
        translate('-100%', 20),
        rotateZ(-90)
      ),
    },
  },
  down: {
    transformOrigin: ['100%', '100%'],
    transform: multiple(
      translate('-100%', 0),
      rotateZ(90)
    ),
    '&:hover': {
      transform: multiple(
        translate('-100%', -20),
        rotateZ(90)
      ),
    },
  },
  left: {
    '&:hover': {
      transform: translateX(20),
    }
  },
  right: {
    '&:hover': {
      transform: translateX(-20),
    }
  },
})

const isInvertedArrow = (direction) => {
  if (direction === 'top' || direction === 'left') {
    return true
  }
  return false
}

const ToggleArrow = ({onClick, classes, children, direction}) => {
  const classNames = cn(classes.toggler, {
    [classes.up]: direction === 'up',
    [classes.down]: direction === 'down',
    [classes.left]: direction === 'left',
    [classes.right]: direction === 'right',
  })

  const inverted = isInvertedArrow(direction)

  return (
    <button className={classNames} onClick={onClick}>
      {inverted && (
        <div className={classes.arrow}>
          <Arrow className={classes.icon} />
        </div>
      )}
      <span className={classes.text}>
        {children}
      </span>
      {!inverted && (
        <div className={classes.arrow}>
          <Arrow className={classes.icon} />
        </div>
      )}
    </button>
  )
}

ToggleArrow.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['right', 'left', 'up', 'down'])
}

ToggleArrow.defaultProps = {
  direction: 'right'
}

export default injectSheet(styles)(ToggleArrow)
