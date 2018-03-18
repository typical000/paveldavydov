import React from 'react'
import PropTypes from 'prop-types'
import {animateScroll as scroller} from 'react-scroll'
import injectSheet from '../../utils/jss'
import {scrollDuration as duration} from '../../constants/animations'

const styles = {
  scroll: {
    display: 'inline-block',
    verticalAlign: 'middle',
    boxShadow: 'none',
    appearance: 'none',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
    background: 'transparent',
    cursor: 'pointer',
    color: 'currentColor',
    fill: 'currentColor',
  },
}

const scroll = (containerId = null) =>
  scroller.scrollTo(window.outerHeight, {
    smooth: true,
    containerId,
    duration,
  })

/**
 * Scroll down by screen size
 */
const ScrollDown = ({classes, children, containerId}) => (
  <button className={classes.scroll} onClick={() => scroll(containerId)}>
    {children}
  </button>
)

ScrollDown.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  containerId: PropTypes.string,
}

ScrollDown.defaultProps = {
  containerId: false,
}

export default injectSheet(styles)(ScrollDown)
