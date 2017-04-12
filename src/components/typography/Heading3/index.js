import React from 'react'
import cn from 'classnames'

import injectSheet from '../../../utils/jss'
import theme from '../../../theme'

const styles = {
  heading: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: 300,
    margin: [0, 0, 20, 0],
    color: theme.textColor
  },
  light: {
    color: theme.textColorMuted
  }
}

const Heading3 = (props) => {
  const {classes, children, light} = props
  const headingClasses = cn(
    classes.heading,
    light && classes.light
  )

  return (
    <h3 className={headingClasses}>
      {children}
    </h3>
  )
}

Heading3.propTypes = {
  children: React.PropTypes.string.isRequired,
  classes: React.PropTypes.object.isRequired,
  light: React.PropTypes.boolean
}

export default injectSheet(styles)(Heading3)
