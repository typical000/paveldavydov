import React from 'react'
import cn from 'classnames'

import injectSheet from '../../../utils/jss'
import theme from '../../../theme'

const styles = {
  heading: {
    fontSize: 42,
    lineHeight: 1.2,
    fontWeight: 300,
    margin: [0, 0, 20, 0],
    textTransform: 'uppercase',
    color: theme.textColor
  },
  light: {
    color: theme.textColorMuted
  }
}

const Heading1 = (props) => {
  const {classes, children, light} = props
  const headingClasses = cn(
    classes.heading,
    light && classes.light
  )

  return (
    <h1 className={headingClasses}>
      {children}
    </h1>
  )
}

Heading1.propTypes = {
  children: React.PropTypes.string.isRequired,
  classes: React.PropTypes.object.isRequired,
  light: React.PropTypes.boolean
}

export default injectSheet(styles)(Heading1)
