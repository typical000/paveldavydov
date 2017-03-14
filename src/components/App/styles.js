import {translate} from 'css-functions'
import theme from '../../theme'

export default {
  app: {
    background: theme.pageBackground,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    overflow: 'hidden',
    minHeight: '100vh',
  },

  content: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },

  scene: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  logo: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: translate('-50%', '-50%'),
    // transition: transition('1s'),
    zIndex: 10,
  },
  logoStatic: {
    composes: '$logo',
    position: 'absolute'
  },
  // logoAttached: {
  //   composes: '$logo',
  // }
}
