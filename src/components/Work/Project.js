import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'css-functions'
import {transparentize} from 'polished'
import ScrollDown from '../ScrollDown'
import ToggleArrow from '../ToggleArrow'
import {H2, H3} from '../typography'
import {mediaSm} from '../../constants/media'
import {opacityAppearKeyframe} from '../../utils/css'
import injectSheet from '../../utils/jss'

const styles = (theme) => ({
  spacing: {
    padding: 40,
  },
  header: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 'auto',
    height: '100%',
    transform: translate('-50%', '-50%'),
  },
  title: {
    fontSize: 54,
    lineHeight: 1.2,
    marginBottom: 40,
    '&::after': {
      content: '""',
      width: '50%',
      display: 'block',
      height: 2,
      background: theme.light,
      margin: [30, 'auto', 0],
    },
  },
  info: {
    textTransform: 'none',
  },
  holder: {
    composes: '$spacing',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    background: transparentize(0.5, theme.dark),
    color: theme.text.light,
    animation: {
      name: 'opacityAppear',
      duration: 500,
    },
  },

  ...opacityAppearKeyframe(),

  content: {
    composes: '$spacing',
  },
  scroll: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: translate('-50%', 0),
  },

  [mediaSm]: {
    spacing: {
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
    info: {
      fontSize: 18,
    },
  },
})

const Project = ({classes, children, image, title, info}) => (
  <div className={classes.project}>
    <div className={classes.header}>
      <img className={classes.image} src={image} role="presentation" />
      <div className={classes.holder}>
        <H2 className={classes.title}>{title}</H2>
        <H3 className={classes.info}>{info}</H3>
        <div className={classes.scroll}>
          <ScrollDown containerId="workLayoutContainer">
            <ToggleArrow direction="down" />
          </ScrollDown>
        </div>
      </div>
    </div>
    <div className={classes.content}>{children}</div>
  </div>
)

Project.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default injectSheet(styles)(Project)
