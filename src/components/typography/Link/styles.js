import {translateX} from 'css-functions'

import {transition} from '../../../utils/css'
import theme from '../../../theme'

export default {
  link: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    overflow: 'hidden',
    margin: [0, -4],
    '&:hover $stateDefault': {
      transform: translateX('100%')
    },
    '&:hover $stateHover': {
      transform: translateX(0),
      opacity: 1
    }
  },
  state: {
    padding: [0, 4],
    display: 'inline-block',
    // verticalAlign: 'middle',
    verticalAlign: 'top',
    transition: transition('500ms')
  },
  stateDefault: {
    composes: '$state',
    borderBottom: [1, 'dotted', theme.textColorLight],
    color: theme.textColorMuted
  },
  stateHover: {
    composes: '$state',
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.textColorInverse,
    background: theme.textColor,
    transform: translateX('-25%'),
    opacity: 0
  }
}
