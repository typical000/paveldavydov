import {translate, rotateZ, multiple} from 'css-functions'

import theme from '../../theme'
import {transition} from '../../utils/css'

const barThickness = 50
const barThicknessHovered = 80

export default {
  popup: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    transition: transition('1s'),
  },

  // Horizontal
  popupHorizontal: {
    composes: '$popup',
    height: '100vh',
    width: '200%',
    '& $bar': {
      width: barThickness,
      top: 0,
      bottom: 0,
    },
    '& $bar:hover': {
      width: barThicknessHovered
    },
    '& $content': {
      width: '50%',
      height: '100%',
    },
  },

  popupLeft: {
    composes: '$popupHorizontal',
    transform: translate('-100%', 0),
    '& $barOpen': {
      left: '100%',
    },
    '& $barClose': {
      right: 0,
    },
    '& $title': {
      textAlign: 'left',
      left: barThickness / 2,
      transform: multiple(
        translate('-50%', '-50%'),
        rotateZ(-90)
      )
    },
    '& $content': {
      float: 'left'
    },
  },

  popupRight: {
    composes: '$popupHorizontal',
    transform: translate('100%', 0),
    left: '-100%',
    '& $barOpen': {
      right: '100%',
    },
    '& $barClose': {
      left: 0,
    },
    '& $title': {
      textAlign: 'right',
      right: barThickness / 2,
      left: 'auto',
      transform: multiple(
        translate('50%', '-50%'),
        rotateZ(90)
      )
    },
    '& $content': {
      float: 'right',
    },
  },

  // Open state
  open: {
    transform: translate(0, 0),
    zIndex: 1001, // Above other popups
  },

  // Inner blocks
  content: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background: theme.pageBackground,
      opacity: 0.8,
    }
  },

  inner: {
    position: 'relative',
    zIndex: 2,
  },

  bar: {
    transition: {
      timingFunction: 'cubic-bezier(1, 0, 0, 1)',
      duration: '800ms'
    },
    border: 0,
    outline: 0,
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    fontFamily: theme.fontFamily,
    background: theme.cardBackground,
    position: 'absolute',
    cursor: 'pointer',
    '&:hover $close': {
      transform: multiple(
        translate('-50%', '-50%'),
        rotateZ(-180)
      ),
    }
  },

  // Opening bar
  barOpen: {
    composes: '$bar',
  },

  // Closing bar
  barClose: {
    composes: '$bar',
  },

  title: {
    textTransform: 'uppercase',
    transformOrigin: ['50%', '50%'],
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%',
    whiteSpace: 'nowrap',
  },

  close: {
    transition: transition('800ms'),
    transformOrigin: ['50%', '50%'],
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 24,
    height: 24,
    opacity: 0.7,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: 1,
      top: '50%',
      left: 0,
      background: theme.textColor,
    },
    '&::before': {
      transform: rotateZ(45),
    },
    '&::after': {
      transform: rotateZ(-45),
    },
  }
}
