import React, {PropTypes} from 'react'
import cn from 'classnames'

import Icon from './Icon'

const Mouse = ({className, dotClassName}) => (
  <Icon>
    {({sheet: {classes}}) => (
      <svg
        className={cn(classes.icon, className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 40"
      >
        <path className={dotClassName} d="M12.5 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7a2.502 2.502 0 0 1-2.5-2.5c0-1.379 1.122-2.5 2.5-2.5s2.5 1.122 2.5 2.5-1.121 2.5-2.5 2.5z" />
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5v15C0 34.403 5.596 40 12.5 40S25 34.403 25 27.5v-15C25 5.596 19.404 0 12.5 0zM23 27.5C23 33.29 18.29 38 12.5 38S2 33.289 2 27.5v-15C2 6.71 6.71 2 12.5 2S23 6.71 23 12.5v15z" />
      </svg>
    )}
  </Icon>
)

Mouse.propTypes = {
  className: PropTypes.string,
  dotClassName: PropTypes.string
}

export default Mouse
