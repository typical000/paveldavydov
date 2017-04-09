import theme from '../../theme'

export default {
  about: {
    position: 'relative',
    height: '100%',
    overflowY: 'auto'
  },
  container: {
    position: 'relative'
  },
  containerTop: {
    composes: '$container',
    height: '100vh',
    overflow: 'hidden'
  },
  containerBottom: {
    composes: '$container',
    padding: 100,
    background: theme.cardBackground,
  },

  block: {
    boxSizing: 'border-box',
    float: 'left',
    height: '100%',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  blockPhoto: {
    composes: '$block',
    background: theme.cardBackground,
    width: '52%'
  },
  blockName: {
    composes: '$block',
    padding: [100, 100, 100, 50],
    width: '48%'
  },

  // Inner, smaller elements
  name: {
    textTransform: 'uppercase',
    fontSize: 42,
    lineHeight: 1.2,
    fontWeight: 300,
    margin: [0, 0, 20, 0],
    color: theme.textColor,
  },
  quote: {
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: 300,
    margin: [0, 0, 40, 0],
    color: theme.textColorMuted,
  },
  mail: {

  },

  // More button
  more: {
    position: 'absolute',
    bottom: 70,
    right: 60
  }
}
