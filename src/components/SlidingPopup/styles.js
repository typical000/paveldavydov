import {translate, rotateZ, scale, multiple} from 'css-functions'

import theme from '../../theme'
import {transition} from '../../utils/css'
import {bar, barHovered, barSm, barSmHovered} from '../../constants/sizes'

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
    transform: translate('-100%', 0)
  },

  popupRight: {
    composes: '$popup',
    transform: translate('100%', 0),
    left: '-100%'
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
    background: theme.cardBackground,
  },
  overlayLeft: {
    composes: '$overlay',
    left: '100%'
  },
  overlayRight: {
    composes: '$overlay',
    right: '100%'
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
  },
  overlayTopLeft: {
    composes: '$overlayTop',
    '&::before': {
      width: '60%',
      transform: translate('-50%', -10)
    },
    '&::after': {
      width: '40%',
      transform: translate('-35%', 10)
    }
  },
  overlayTopRight: {
    composes: '$overlayTop',
    '&::before': {
      width: '65%',
      transform: translate('-60%', 40)
    },
    '&::after': {
      width: '45%',
      transform: translate('-85%', 60)
    }
  },

  overlayBottom: {
    extend: 'overlayTop',
  },
  overlayBottomLeft: {
    composes: '$overlayBottom',
    '&::before': {
      width: '70%',
      transform: translate('-40%', -80)
    },
    '&::after': {
      width: '55%',
      transform: translate('-70%', -125)
    }
  },
  overlayBottomRight: {
    composes: '$overlayBottom',
    '&::before': {
      width: '50%',
      transform: translate('-40%', -40)
    },
    '&::after': {
      width: '55%',
      transform: translate('-70%', -75)
    }
  },

  // Inner blocks
  content: {
    width: '50%',
    height: '100%',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background: theme.pageBackground,
      opacity: 0.6,
    },
    // Additional bar on side
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      background: theme.cardBackground,
      width: bar,
      zIndex: 10,
    },
    [theme.media.sm]: {
      '&::after': {
        width: barSm
      }
    }
  },
  contentLeft: {
    composes: '$content',
    float: 'left',
    '&::after': {
      left: 0
    }
  },
  contentRight: {
    composes: '$content',
    float: 'right',
    '&::after': {
      right: 0
    }
  },

  inner: {
    width: '100%',
    position: 'relative',
    zIndex: 2,
    height: '100vh',
    overflowY: 'auto'
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
    width: bar,
    top: 0,
    bottom: 0,
    zIndex: 10,
    '&:hover': {
      width: barHovered
    },
    [theme.media.sm]: {
      width: barSm,
      '&:hover': {
        width: barSmHovered
      }
    }
  },

  // Opening bar
  barOpen: {
    composes: '$bar',
  },
  barOpenLeft: {
    composes: '$barOpen',
    left: '100%'
  },
  barOpenRight: {
    composes: '$barOpen',
    right: '100%'
  },

  // Closing bar
  barClose: {
    composes: '$bar',
  },
  barCloseLeft: {
    composes: '$barClose',
    right: 0
  },
  barCloseRight: {
    composes: '$barClose',
    left: 0
  },

  title: {
    textTransform: 'uppercase',
    transformOrigin: ['50%', '50%'],
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%',
    whiteSpace: 'nowrap',
    fontSize: theme.fontSize,
    [theme.media.sm]: {
      fontSize: Math.floor(theme.fontSize * 0.9)
    }
  },
  titleLeft: {
    composes: '$title',
    textAlign: 'left',
    left: bar / 2,
    transform: multiple(
      translate('-50%', '-50%'),
      rotateZ(-90)
    ),
    [theme.media.sm]: {
      left: barSm / 2
    }
  },
  titleRight: {
    composes: '$title',
    textAlign: 'right',
    right: bar / 2,
    left: 'auto',
    transform: multiple(
      translate('50%', '-50%'),
      rotateZ(90)
    ),
    [theme.media.sm]: {
      right: barSm / 2
    }
  },

  close: {
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%',
    [theme.media.sm]: {
      transform: multiple(
        translate('-50%', '-50%'),
        scale(0.8, 0.8)
      )
    }
  }
}
