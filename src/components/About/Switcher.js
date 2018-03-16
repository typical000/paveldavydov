import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translateY} from 'css-functions'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'
import ToggleArrow from '../ToggleArrow'
import ParallaxLayer from '../ParallaxMousemove'

const styles = {
  switcher: {
    position: 'absolute',
    zIndex: 10,
    left: 40,
    transition: transition(),
    '&$visible': {
      transform: translateY(0),
    },
  },
  top: {
    composes: '$switcher',
    top: 40,
    '&$hidden': {
      transform: translateY('-100%'),
    },
  },
  bottom: {
    composes: '$switcher',
    bottom: 40,
    '&$hidden': {
      transform: translateY('100%'),
    },
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
  hidden: {
    opacity: 0,
    visibility: 'hidden',
  },
}

/**
 * @param {string} direction
 * @param {string} text
 * @param {Function} clickHandler
 * @param {bool} animateParallax
 */
const renderArrow = (direction, text, clickHandler, animateParallax) => (
  <ParallaxLayer yFactor={animateParallax ? 0.1 : 0}>
    <ToggleArrow onClick={clickHandler} direction={direction}>
      {text}
    </ToggleArrow>
  </ParallaxLayer>
)

const Switcher = ({classes, activated, animateParallax, onClick}) => (
  <div>
    <div
      className={cn(classes.top, activated ? classes.visible : classes.hidden)}
    >
      {renderArrow('up', 'Read less', onClick, animateParallax)}
    </div>
    <div
      className={cn(
        classes.bottom,
        activated ? classes.hidden : classes.visible,
      )}
    >
      {renderArrow('down', 'Read more', onClick, animateParallax)}
    </div>
  </div>
)

Switcher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  activated: PropTypes.bool,
  animateParallax: PropTypes.bool,
}

Switcher.defaultProps = {
  activated: false,
  animateParallax: false,
}

export default injectSheet(styles)(Switcher)
