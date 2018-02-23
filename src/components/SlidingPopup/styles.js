import {translate, rotateZ, scale, multiple} from 'css-functions'
import {transition} from '../../utils/css'
import {bar, barSm} from '../../constants/sizes'
import {mediaSm} from '../../constants/media'

export default (theme) => ({
  popup: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    transition: transition('1.2s'),
  },

  // Abstraction over 2 types of popups
  popupHorizontal: {
    composes: '$popup',
    height: '100vh',
    width: '200%',
  },

  popupVertical: {
    composes: '$popup',
    width: '100vw',
    height: '200%',
  },

  popupLeft: {
    composes: '$popupHorizontal',
    transform: translate('-100%', 0),
    left: 0,
  },

  popupRight: {
    composes: '$popupHorizontal',
    transform: translate('100%', 0),
    left: '-100%',
  },

  popupTop: {
    composes: '$popupVertical',
    transform: translate(0, '-100%'),
    top: 0,
  },

  popupBottom: {
    composes: '$popupVertical',
    transform: translate(0, '100%'),
    top: '-100%',
  },

  // Active (open) state
  active: {
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
    background: `linear-gradient(to right, ${
      theme.background.overlay
    } 50%, rgba(0,0,0,0))`,
    left: '100%',
  },
  overlayRight: {
    composes: '$overlay',
    background: `linear-gradient(to left, ${
      theme.background.overlay
    } 50%, rgba(0,0,0,0))`,
    right: '100%',
  },
  overlayTop: {
    composes: '$overlay',
    background: `linear-gradient(to bottom, ${
      theme.background.overlay
    } 50%, rgba(0,0,0,0))`,
    top: '100%',
  },
  overlayBottom: {
    composes: '$overlay',
    background: `linear-gradient(to top, ${
      theme.background.overlay
    } 50%, rgba(0,0,0,0))`,
    bottom: '100%',
  },

  // TODO: Think about removing this things if they are not visible
  overlayInnerTop: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      height: 1,
      top: '50%',
      left: '50%',
      background: theme.common.border,
      opacity: 0.3,
    },
  },
  overlayInnerTopLeft: {
    composes: '$overlayInnerTop',
    '&::before': {
      width: '60%',
      transform: translate('-50%', -10),
    },
    '&::after': {
      width: '40%',
      transform: translate('-35%', 10),
    },
  },
  overlayInnerTopRight: {
    composes: '$overlayInnerTop',
    '&::before': {
      width: '65%',
      transform: translate('-60%', 40),
    },
    '&::after': {
      width: '45%',
      transform: translate('-85%', 60),
    },
  },
  overlayInnerTopTop: {
    composes: '$overlayInnerTop',
    '&::before': {
      width: 1,
      height: '60%',
      transform: translate(40, '-40%'),
    },
    '&::after': {
      width: 1,
      height: '40%',
      transform: translate(70, '-45%'),
    },
  },
  overlayInnerTopBottom: {
    composes: '$overlayInnerTop',
    '&::before': {
      width: 1,
      height: '65%',
      transform: translate(40, '-60%'),
    },
    '&::after': {
      width: 1,
      height: '45%',
      transform: translate(60, '-85%'),
    },
  },

  overlayInnerBottom: {
    extend: 'overlayInnerTop',
  },
  overlayInnerBottomLeft: {
    composes: '$overlayInnerBottom',
    '&::before': {
      width: '70%',
      transform: translate('-40%', -80),
    },
    '&::after': {
      width: '55%',
      transform: translate('-70%', -125),
    },
  },
  overlayInnerBottomRight: {
    composes: '$overlayInnerBottom',
    '&::before': {
      width: '50%',
      transform: translate('-40%', -40),
    },
    '&::after': {
      width: '55%',
      transform: translate('-70%', -75),
    },
  },
  overlayInnerBottomTop: {
    composes: '$overlayInnerBottom',
    '&::before': {
      width: 1,
      height: '70%',
      transform: translate(-125, '-40%'),
    },
    '&::after': {
      width: 1,
      height: '55%',
      transform: translate(-50, '-70%'),
    },
  },
  overlayInnerBottomBottom: {
    composes: '$overlayInnerBottom',
    '&::before': {
      width: 1,
      height: '70%',
      transform: translate(-80, '-40%'),
    },
    '&::after': {
      width: 1,
      height: '55%',
      transform: translate(100, '-70%'),
    },
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
  contentTop: {
    composes: '$content',
    width: '100%',
    height: '50%',
    marginBottom: '100vh',
  },
  contentBottom: {
    composes: '$content',
    width: '100%',
    height: '50%',
    marginTop: '100vh',
  },

  inner: {
    width: '100%',
    position: 'relative',
    zIndex: 2,
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  bar: {
    transition: {
      timingFunction: 'cubic-bezier(1, 0, 0, 1)',
      duration: '500ms',
      delay: '500ms',
    },
    border: 0,
    outline: 0,
    padding: 0,
    margin: 0,
    boxShadow: 'none',
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 10,
    color: theme.text.default,
    background: 'transparent',
    letterSpacing: 2,
    opacity: 1,
    font: {
      family: theme.typography.fontFamily,
      size: 18,
      weight: 'bold',
    },
    '&:hover $title::after': {
      transform: scale(1, 1),
    },
  },

  hidden: {
    opacity: 0,
  },

  barVertical: {
    composes: '$bar',
    width: bar,
    top: 0,
    bottom: 0,
    [mediaSm]: {
      width: barSm,
    },
  },
  barHorizontal: {
    composes: '$bar',
    height: bar,
    left: 0,
    right: 0,
    width: '100%',
    [mediaSm]: {
      height: barSm,
    },
  },

  // Opening bar
  barActiveLeft: {
    composes: '$barVertical',
    left: '100%',
  },
  barActiveRight: {
    composes: '$barVertical',
    right: '100%',
  },
  barActiveTop: {
    composes: '$barHorizontal',
    top: '100%',
  },
  barActiveBottom: {
    composes: '$barHorizontal',
    bottom: '100%',
  },

  // Closing bar
  barCloseLeft: {
    composes: '$barVertical',
    right: 0,
  },
  barCloseRight: {
    composes: '$barVertical',
    left: 0,
  },
  barCloseTop: {
    composes: '$barHorizontal',
    bottom: 0,
  },
  barCloseBottom: {
    composes: '$barHorizontal',
    top: 0,
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
    color: theme.text.default,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      height: 3,
      background: theme.text.default,
      transition: transition(),
      transform: scale(0, 1),
    },
    [mediaSm]: {
      fontSize: theme.typography.fontSize,
    },
  },

  // Abstract classes for vertical or horizontal title
  titleVertical: {
    composes: '$title',
    '&::after': {
      top: '100%',
      marginTop: 10,
    },
    [mediaSm]: {
      '&::after': {
        marginTop: 5,
      },
    },
  },
  titleHorizontal: {
    composes: '$title',
  },

  titleLeft: {
    composes: '$titleVertical',
    textAlign: 'left',
    left: bar / 2,
    transform: multiple(translate('-50%', '-50%'), rotateZ(-90)),
    [mediaSm]: {
      left: barSm / 2,
    },
  },
  titleRight: {
    composes: '$titleVertical',
    textAlign: 'right',
    right: bar / 2,
    left: 'auto',
    transform: multiple(translate('50%', '-50%'), rotateZ(90)),
    [mediaSm]: {
      right: barSm / 2,
    },
  },
  titleTop: {
    composes: '$titleHorizontal',
    left: '50%',
    top: '50%',
    '&::after': {
      top: '100%',
      marginTop: 10,
    },
    [mediaSm]: {
      '&::after': {
        marginTop: 5,
      },
    },
  },
  titleBottom: {
    composes: '$titleHorizontal',
    left: '50%',
    bottom: 0,
    '&::after': {
      bottom: '100%',
      marginBottom: 10,
    },
    [mediaSm]: {
      '&::after': {
        marginBottom: 5,
      },
    },
  },

  close: {
    transform: translate('-50%', '-50%'),
    position: 'absolute',
    top: '50%',
    left: '50%',
    [mediaSm]: {
      transform: multiple(translate('-50%', '-50%'), scale(0.8, 0.8)),
    },
  },
})
