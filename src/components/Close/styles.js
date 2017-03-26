import {rotateZ} from 'css-functions'

import {transition} from '../../utils/css'
import theme from '../../theme'

const color = theme.textColor
const size = 24
const barWeight = 1

export default {
  close: {
    transition: transition('800ms'),
    transformOrigin: ['50%', '50%'],
    width: size,
    height: size,
    opacity: 0.7,
    position: 'relative',
  },
  hovered: {
    composes: '$close',
    transform: rotateZ(-180),
  },

  bar: {
    position: 'absolute',
    width: '100%',
    height: barWeight,
    top: '50%',
    left: 0,
    background: color
  },
  barFirst: {
    composes: '$bar',
    transform: rotateZ(45)
  },
  barSecond: {
    composes: '$bar',
    transform: rotateZ(-45)
  }
}
