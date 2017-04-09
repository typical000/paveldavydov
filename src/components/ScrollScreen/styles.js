import {rotateZ, translateY, multiple} from 'css-functions'

import {transition} from '../../utils/css'
import theme from '../../theme'

export default {
  scroll: {
    font: {
      family: theme.fontFamily,
      size: theme.fontSize
    },
    border: 0,
    outline: 0,
    padding: 0,
    margin: 0,
    background: 'transparent',
    cursor: 'pointer',
    transformOrigin: ['100%', '100%'],
    transform: multiple(
      rotateZ(90),
      translateY('100%')
    ),
    transition: transition(1000),
    color: theme.textColorLight,
    fill: theme.textColorLight,
    '&:hover': {
      color: theme.textColor,
      fill: theme.textColor,
      paddingRight: 10
    }
  },
  text: {
    verticalAlign: 'middle'
  },
  icon: {
    paddingLeft: 10,
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}
