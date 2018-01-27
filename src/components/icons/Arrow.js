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
        viewBox="0 0 60 23"
      >
        <path d="M49 23l-.5-.5L58.938 12H0v-1h58.938L48.5.5 49 0l11 11v1L49 23z" />
      </svg>
    )}
  </Icon>
)

Arrow.propTypes = {
  className: PropTypes.string
}

export default Arrow
