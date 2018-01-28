import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from './Icon'

const Arrow = ({className}) => (
  <Icon>
    {({classes}) => (
      <svg
        className={cn(classes.icon, className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 10"
      >
        <path d="M0 4 L14 4 14 0 20 5 14 10 14 6 0 6z" />
      </svg>
    )}
  </Icon>
)

Arrow.propTypes = {
  className: PropTypes.string
}

export default Arrow
