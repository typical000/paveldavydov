import theme from '../../theme'

export default {
  app: {
    background: theme.pageBackground,
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    overflow: 'hidden',
    minHeight: '100vh'
  },
  content: {
    width: '100vh',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },
  scene: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  }
}
