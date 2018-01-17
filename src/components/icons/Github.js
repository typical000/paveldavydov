import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from './Icon'

const Github = ({className}) => (
  <Icon>
    {({classes}) => (
      <svg
        className={cn(classes.icon, className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.999 0C4.478 0 0 4.59 0 10.254c0 4.53 2.865 8.373 6.839 9.729.5.094.683-.223.683-.494 0-.243-.009-.888-.014-1.744-2.782.619-3.368-1.375-3.368-1.375-.455-1.184-1.11-1.5-1.11-1.5-.908-.636.069-.623.069-.623 1.004.073 1.532 1.057 1.532 1.057.892 1.567 2.34 1.114 2.91.852.091-.663.349-1.114.635-1.371-2.222-.259-4.556-1.139-4.556-5.068 0-1.119.39-2.035 1.029-2.751-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.051a9.377 9.377 0 0 1 2.504-.345 9.394 9.394 0 0 1 2.504.345c1.909-1.327 2.747-1.051 2.747-1.051.546 1.412.202 2.454.1 2.713.641.717 1.028 1.632 1.028 2.751 0 3.939-2.338 4.806-4.566 5.059.359.317.679.942.679 1.899 0 1.371-.012 2.477-.012 2.813 0 .274.18.593.688.493C17.137 18.623 20 14.782 20 10.254 20 4.59 15.522 0 9.999 0z" />
      </svg>
    )}
  </Icon>
)

Github.propTypes = {
  className: PropTypes.string
}

export default Github
