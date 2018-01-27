import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from './Icon'

const Email = ({className}) => (
  <Icon>
    {({classes}) => (
      <svg
        className={cn(classes.icon, className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path id="Shape" d="M9.73196 8.48454l4.9498 4.24268c-.18008.16824-.42226.27278-.6886.27278H2.00684c-.26765 0-.5106-.10294-.69077-.27092l4.95197-4.24454L8 10l1.73196-1.51546zM8 9L1.31824 3.27278C1.49832 3.10454 1.7405 3 2.00684 3h11.98632c.26765 0 .5106.10294.69077.27092L8 9zm7 3.18561l-4.83264-4.10675L15 3.87542v8.31019zm-14 0V3.87815l4.83264 4.20071L1 12.18561zm0 0" />
      </svg>
    )}
  </Icon>
)

Email.propTypes = {
  className: PropTypes.string
}

export default Email
