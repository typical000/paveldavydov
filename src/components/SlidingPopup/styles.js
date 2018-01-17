import {translate, rotateZ, scale, multiple} from 'css-functions'

import theme from '../../theme'
import {transition} from '../../utils/css'
import {bar, barHovered, barSm, barSmHovered} from '../../constants/sizes'
import {mediaSm} from '../../constants/media'

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
    background: theme.background.overlay,
  },
  overlayLeft: {
    composes: '$overlay',
    background: `linear-gradient(to right, ${theme.background.overlay} 50%, rgba(0,0,0,0))`,
    left: '100%',
  },
  overlayRight: {
    composes: '$overlay',
    background: `linear-gradient(to left, ${theme.background.overlay} 50%, rgba(0,0,0,0))`,
    right: '100%',
  },

  // TODO: Think about removing this things if they are not visible
  overlayTop: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      height: 1,
      top: '50%',
      left: '50%',
      background: theme.common.border,
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
    background: theme.background.overlay,
  },
  contentLeft: {
    composes: '$content',
    float: 'left',
  },
  contentRight: {
    composes: '$content',
    float: 'right',
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
    position: 'absolute',
    cursor: 'pointer',
    width: bar,
    top: 0,
    bottom: 0,
    zIndex: 10,
    color: theme.text.default,
    background: 'transparent',
    font: {
      family: theme.typography.fontFamily,
      size: 18,
      weight: 'bold'
    },
    [mediaSm]: {
      width: barSm,
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
    fontSize: Math.floor(theme.typography.fontSize * 1.15),
    [mediaSm]: {
      fontSize: Math.floor(theme.typography.fontSize * 0.9)
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
    [mediaSm]: {
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
    [mediaSm]: {
      right: barSm / 2
    }
  },

  close: {
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%',
    [mediaSm]: {
      transform: multiple(
        translate('-50%', '-50%'),
        scale(0.8, 0.8)
      )
    }
  }
}
