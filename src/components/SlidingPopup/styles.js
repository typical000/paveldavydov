import {translate, rotateZ, multiple} from 'css-functions'

import theme from '../../theme'
import {transition} from '../../utils/css'
import {barThickness, barThicknessHovered} from '../../constants/sizes'

export default {
  popup: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    transition: transition('1.2s'),
    height: '100vh',
    width: '200%'
  },

  popupLeft: {
    composes: '$popup',
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
    composes: '$popup',
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
      '&::after': {
        right: 0,
        left: 'auto'
      }
    },
    '& $overlay': {
      left: 'auto',
      right: '100%'
    },
    '& $overlayTop': {
      '&::before': {
        width: '65%',
        transform: translate('-60%', 40)
      },
      '&::after': {
        width: '45%',
        transform: translate('-85%', 60)
      }
    },
    '& $overlayBottom': {
      extend: 'overlayTop',
      '&::before': {
        width: '50%',
        transform: translate('-40%', -40)
      },
      '&::after': {
        width: '55%',
        transform: translate('-70%', -75)
      }
    },
  },

  // Open state
  open: {
    transform: translate(0, 0),
    zIndex: 1001, // Above other popups
  },

  // Sliding content
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '100%',
    background: theme.cardBackground,
  },
  overlayTop: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      height: 1,
      top: '50%',
      left: '50%',
      background: theme.textColorLight,
      opacity: 0.3
    },
    '&::before': {
      width: '60%',
      transform: translate('-50%', -10)
    },
    '&::after': {
      width: '40%',
      transform: translate('-35%', 10)
    }
  },
  overlayBottom: {
    extend: 'overlayTop',
    '&::before': {
      width: '70%',
      transform: translate('-40%', -80)
    },
    '&::after': {
      width: '55%',
      transform: translate('-70%', -125)
    }
  },

  // Inner blocks
  content: {
    width: '50%',
    height: '100%',
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
    },
    // Additional bar on side
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      background: theme.cardBackground,
      width: barThickness
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
    width: barThickness,
    top: 0,
    bottom: 0,
    '&:hover': {
      width: barThicknessHovered
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
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
}
