import React from 'react'
import cn from 'classnames'

import injectSheet from '../../../utils/jss'
import styles from './styles'

const Link = (props) => {
  const {
    href,
    target,
    classes,
    children,
    customClass
  } = props

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
      {children}
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
