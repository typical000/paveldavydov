import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translateY} from 'css-functions'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'
import ToggleArrow from '../ToggleArrow'

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

const Switcher = ({classes, activated, onClick}) => (
  <div>
    <div
      className={cn(classes.top, activated ? classes.visible : classes.hidden)}
    >
      <ToggleArrow onClick={onClick} direction={'up'}>
        Read less
      </ToggleArrow>
    </div>
    <div
      className={cn(
        classes.bottom,
        activated ? classes.hidden : classes.visible,
      )}
    >
      <ToggleArrow onClick={onClick} direction={'down'}>
        Read more
      </ToggleArrow>
    </div>
  </div>
)

Switcher.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  activated: PropTypes.bool,
}

Switcher.defaultProps = {
  activated: false,
}

export default injectSheet(styles)(Switcher)
