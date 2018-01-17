import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'

const styles = theme => ({
  heading: {
    fontSize: 24,
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

const H3 = (props) => {
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

H3.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  light: PropTypes.bool
}

export default injectSheet(styles)(H3)
