import React from 'react'
import cn from 'classnames'
import {translateX} from 'css-functions'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'

const styles = (theme) => ({
  link: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    overflow: 'hidden',
    margin: [0, -4],
    '&:hover $stateDefault': {
      transform: translateX('100%')
    },
    '&:hover $stateHover': {
      transform: translateX(0),
      opacity: 1
    }
  },
  state: {
    padding: [0, 4],
    display: 'inline-block',
    verticalAlign: 'top',
    transition: transition('500ms')
  },
  stateDefault: {
    composes: '$state',
    borderBottom: [1, 'dotted', theme.text.light],
    color: theme.text.muted
  },
  stateHover: {
    composes: '$state',
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.text.inverse,
    background: theme.common.cardInverse,
    transform: translateX('-25%'),
    opacity: 0
  }
})

const Link = (props) => {
  const {href, target, classes, children, customClass} = props
  const linkClass = cn(
    classes.link,
    customClass
  )

  return (
    <a
      className={linkClass}
      href={href}
      target={target}
    >
      <span className={classes.stateHover}>{children}</span>
      <span className={classes.stateDefault}>{children}</span>
    </a>
  )
}

Link.propTypes = {
  children: React.PropTypes.string.isRequired,
  classes: React.PropTypes.object.isRequired,
  customClass: React.PropTypes.string,
  href: React.PropTypes.string,
  target: React.PropTypes.string
}

export default injectSheet(styles)(Link)
