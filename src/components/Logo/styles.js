import {translate, scale, rotateZ} from 'css-functions'
import {mediaMd, mediaXs} from '../../constants/media'
import theme from '../../theme'
import {transition, border} from '../../utils/css'

const size = 220
const transitionTime = '500ms'
const transitionMoveTime = '1s'

const ringColor = theme.common.border
const ringOuterMultiplier = 0.8
const ringMiddleMultiplier = 0.65
const ringInnerMultiplier = 0.5
const ringOffset = 24
const ringAnimationSpeed = 50000

const nameHeight = 60
const nameFontSize = 36
const nameChangeInterval = 7000

const nameColor = theme.text.default
const positionColor = theme.text.highlight

export default {
  logo: {
    width: size,
    height: size,
    userSelect: 'none',
    transition: transition(transitionTime),
  },

  // Title styles
  title: {
    transition: transition(transitionMoveTime),
    fontSize: nameFontSize,
    fontWeight: 'bold',
    height: nameHeight,
    lineHeight: `${nameHeight}px`,
    letterSpacing: 4,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: translate(0, '-50%'),
  },
  inner: {
    transition: transition(transitionTime),
    height: nameHeight,
    top: 0,
    overflow: 'hidden',
    position: 'absolute',
    maskImage:
      'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
  },
  name: {
    composes: '$inner',
    textAlign: 'right',
    right: '100%',
    color: nameColor,
    paddingRight: 3,
  },
  position: {
    composes: '$inner',
    textAlign: 'left',
    left: '100%',
    color: positionColor,
    paddingLeft: 3,
  },

  textContainer: {
    transition: transition(transitionTime, transitionTime),
    transform: translate(0, 0),
  },
  textName: {
    composes: '$textContainer',
  },
  textPosition: {
    composes: '$textContainer',
  },

  switcher: {
    transition: transition(transitionTime),
    animation: `nameChange ${nameChangeInterval}ms ease infinite both`,
  },

  // Outer rings styles
  parts: {
    transition: transition(transitionMoveTime),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  part: {
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
    transition: transition(transitionTime),
    height: size / 2 - nameHeight / 2,
  },
  partTop: {
    composes: '$part',
    top: 0,
  },
  partBottom: {
    composes: '$part',
    bottom: 0,
  },

  container: {
    position: 'absolute',
    left: 0,
    width: size,
    height: size,
  },
  containerTop: {
    composes: '$container',
    top: 0,
  },
  containerBottom: {
    composes: '$container',
    bottom: 0,
  },

  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: -ringOffset / 2,
      right: -ringOffset / 2,
      bottom: 0,
      borderRadius: '50%',
      border: border('transparent'),
    },
    '&::before': {
      transform: translate(0, -ringOffset),
      borderTop: border(ringColor),
    },
    '&::after': {
      transform: translate(0, ringOffset),
      borderBottom: border(ringColor),
    },
    '&:first-child': {
      transform: rotateZ(90),
    },
  },

  ring: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    transformOrigin: ['50%', '50%'],
  },
  ringOuter: {
    composes: '$ring',
    width: (size - ringOffset) * ringOuterMultiplier,
    height: (size - ringOffset) * ringOuterMultiplier,
    animation: {
      name: 'rotateAnimation',
      duration: ringAnimationSpeed * 1.2,
      direction: 'alternate',
      iterationCount: 'infinite',
      timingFunction: 'linear',
    },
  },
  ringMiddle: {
    composes: '$ring',
    width: (size - ringOffset) * ringMiddleMultiplier,
    height: (size - ringOffset) * ringMiddleMultiplier,
    transform: rotateZ(45),
    animation: {
      name: 'rotateAnimation',
      duration: ringAnimationSpeed,
      direction: 'reverse',
      iterationCount: 'infinite',
      timingFunction: 'linear',
    },
  },
  ringInner: {
    composes: '$ring',
    width: (size - ringOffset) * ringInnerMultiplier,
    height: (size - ringOffset) * ringInnerMultiplier,
    animation: {
      name: 'rotateAnimation',
      duration: ringAnimationSpeed * 0.8,
      direction: 'alternate',
      iterationCount: 'infinite',
      timingFunction: 'linear',
    },
  },

  // Closed global state
  closed: {
    opacity: 0.5,
    '& $part': {
      height: size / 2,
      transition: transition(transitionTime, transitionTime),
    },
    '& $inner': {
      transition: transition(transitionTime, transitionTime),
      height: 0,
      top: '50%',
    },
    '& $textContainer': {
      transition: transition(transitionTime),
    },
    '& $textName': {
      transform: translate('110%', 0),
    },
    '& $textPosition': {
      transform: translate('-110%', 0),
    },
  },

  // Keyframes
  '@keyframes nameChange': {
    '0%': {
      transform: translate(0, 0),
    },
    '10%': {
      transform: translate(0, '-50%'),
    },
    '50%': {
      transform: translate(0, '-50%'),
    },
    '60%': {
      transform: translate(0, 0),
    },
  },

  '@keyframes rotateAnimation': {
    '0%': {
      transform: rotateZ(0),
    },
    '100%': {
      transform: rotateZ(360),
    },
  },

  [mediaMd]: {
    title: {
      height: nameHeight * 2,
    },
    name: {
      textAlign: 'center',
      padding: 0,
      left: -200,
      right: -200,
      width: 'auto',
    },
    position: {
      textAlign: 'center',
      padding: 0,
      left: -200,
      right: -200,
      width: 'auto',
      top: 'auto',
      bottom: 0,
    },
    part: {
      height: size / 2 - nameHeight,
    },
  },

  [mediaXs]: {
    logo: {
      transformOrigin: ['50%', '50%'],
      transform: scale(0.6, 0.6),
    },
  },
}
