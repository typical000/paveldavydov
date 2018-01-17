import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  heading: {
    fontSize: 32,
    lineHeight: 1.4,
    fontWeight: 300,
    margin: [0, 0, 20, 0],
    textTransform: 'none',
    color: theme.text.default
  },
  light: {
    color: theme.text.muted
  }
})

const H2 = (props) => {
  const {classes, children, light} = props
  const headingClasses = cn(
    classes.heading,
    light && classes.light
  )

  return (
    <h2 className={headingClasses}>
      {children}
    </h2>
  )
}

H2.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  light: PropTypes.bool
}

export default injectSheet(styles)(H2)
