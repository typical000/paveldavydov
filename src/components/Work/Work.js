import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {scale, translateY} from 'css-functions'
import {H3} from '../typography'
import {transition} from '../../utils/css'
import injectSheet from '../../utils/jss'

const itemSpace = 40

const styles = (theme) => ({
  work: {
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    '&:hover $content::before': {
      transform: scale(1, 1),
    },
    '&:hover $title, &:hover $info': {
      transform: translateY(10),
    },
    '&:hover $img': {
      transform: scale(1.1, 1.1),
    },
  },
  first: {
    '& $content::after': {
      left: itemSpace,
    },
  },
  last: {
    '& $content::after': {
      right: itemSpace,
    },
  },
  focused: {
    '& $picture': {
      transform: scale(0.9, 0.9),
    },
  },
  picture: {
    transition: {
      property: 'all',
      easing: 'linear',
      duration: 1000,
    },
    overflow: 'hidden',
    width: `calc(100% - ${itemSpace * 2}px)`,
    height: `calc(100% - ${itemSpace * 2 / 1.5}px)`,
    background: 'rgba(255, 255, 255, 0.1)',
    margin: [0, 'auto', 30],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: 'auto',
    transition: {
      property: 'all',
      easing: 'linear',
      duration: 800,
    },
  },
  content: {
    position: 'relative',
    marginTop: 20,
    paddingTop: 30,
    paddingBottom: 20,
    '&::after, &::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      height: 1,
      left: 0,
      right: 0,
      transition: transition(),
    },
    '&::after': {
      background: theme.common.border,
      zIndex: 1,
    },
    '&::before': {
      transform: scale(0, 1),
      left: itemSpace,
      right: itemSpace,
      top: -1,
      height: 2,
      background: theme.light,
      zIndex: 2,
    },
  },
  title: {
    margin: [0, itemSpace],
    fontSize: Math.floor(theme.typography.fontSize * 1.15),
    transition: transition(600),
  },
  info: {
    margin: [0, itemSpace],
    color: theme.text.muted,
    transition: transition(600, 50),
  },
})

const getStringIndex = (index) => {
  if (index > 9) return index
  return `0${index}`
}

const Work = ({classes, image, index, title, info, first, last, focused}) => (
  <div
    className={cn(classes.work, {
      [classes.first]: first,
      [classes.last]: last,
      [classes.focused]: focused,
    })}
  >
    <div className={classes.picture}>
      <img className={classes.img} src={image} role="presentation" />
    </div>
    <div className={classes.number}>{getStringIndex(index)}</div>
    <div className={classes.content}>
      <H3 className={classes.title}>{title}</H3>
      <div className={classes.info}>{info}</div>
    </div>
  </div>
)

Work.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  index: PropTypes.number,
  first: PropTypes.bool,
  last: PropTypes.bool,
  focused: PropTypes.bool,
}

Work.defaultProps = {
  index: 0,
  first: false,
  last: false,
  focused: false,
}

export default injectSheet(styles)(Work)
