import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'
import {mediaSm} from '../../constants/media'

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noScroll: {
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
  },
  title: {
    pointerEvents: 'none',
    userSelect: 'none',
    position: 'absolute',
    textTransform: 'uppercase',
    letterSpacing: 10,
    opacity: 0.05,
    font: {
      weight: 'bold',
      size: 120,
      lineHeight: 0.6,
    },
  },
  top: {
    bottom: '50%',
  },
  bottom: {
    top: '50%',
    marginTop: 15
  },
  left: {
    right: '50%',
    marginRight: -15
  },
  right: {
    left: '50%',
    marginLeft: -15
  },
  [mediaSm]: {
    title: {
      display: 'none', // Because title on background is unreadable
    },
  }
}

const Container = ({classes, title, positionX, positionY, noScroll, children}) => (
  <div className={cn(classes.container, noScroll && classes.noScroll)}>
    <div className={classes.mask}>
      <div className={cn(classes.title, classes[positionX], classes[positionY])}>
        {title}
      </div>
    </div>
    <div className={classes.content}>
      {children}
    </div>
  </div>
)

Container.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  positionX: PropTypes.oneOf(['left', 'right']),
  positionY: PropTypes.oneOf(['top', 'bottom']),
  noScroll: PropTypes.bool,
}

Container.defaultProps = {
  title: '',
  positionX: 'left',
  positionY: 'top',
  noScroll: false,
}

export default injectSheet(styles)(Container)
