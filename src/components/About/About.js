import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translate} from 'css-functions'
import Container from '../Container'
import ContentShort from './ContentShort'
import ContentLong from './ContentLong'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'

import ScrollScreen from '../ScrollScreen'

const TRANSITION_DURATION = 300

const styles = theme => ({
  about: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  column: {
    boxSizing: 'border-box',
    width: '50%',
    flexGrow: 1,
    flexShrink: 1,
    position: 'relative',
  },
  photo: {
    composes: '$column',
    // TODO: Temporary, replace with photo
    background: theme.text.default,
    opacity: 0.05,
    height: '100%',
  },
  content: {
    maxWidth: 600,
  },

  // Buttons for content switching
  switcher: {
    position: 'absolute',
    zIndex: 10,
    left: 40,
  },
  top: {
    composes: '$switcher',
    top: 40,
  },
  bottom: {
    composes: '$switcher',
    bottom: 40,
  },

  // Inner content
  short: {
    position: 'absolute',
    top: '50%',
    left: 0,
    '&$visible': {
      transition: transition(TRANSITION_DURATION, TRANSITION_DURATION),
      transform: translate(0, '-50%'),
    },
    '&$hidden': {
      transition: transition(TRANSITION_DURATION, 0),
      transform: translate(0, '-60%'),
    },
  },
  long: {
    '&$visible': {
      transition: transition(TRANSITION_DURATION, 0),
    },
    '&$hidden': {
      transition: transition(TRANSITION_DURATION, TRANSITION_DURATION),
    },
  },

  visible: {
    opacity: 1,
    visibility: 'visible',
    transform: translate(0, 0),
  },
  hidden: {
    opacity: 0,
    visibility: 'hidden',
    transform: translate(0, '-10%'),
  },
})

class About extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleContent = this.toggleContent.bind(this)
  }

  toggleContent() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {classes} = this.props
    const {expanded} = this.state

    return (
      <Container
        title={'About'}
        positionX={'right'}
        positionY={'bottom'}
      >
        {
          /**
           * TODO: Rename ScrollScreen to something more friendly.
           * Redesign arrow to fit any transform
           */
        }
        <div className={classes.top}>
          <ScrollScreen onClick={this.toggleContent}>
            Read less
          </ScrollScreen>
        </div>
        <div className={classes.bottom}>
          <ScrollScreen onClick={this.toggleContent}>
            Read more
          </ScrollScreen>
        </div>
        <div className={classes.about}>
          <div className={classes.photo} />
          <div className={classes.column}>
            <div className={classes.content}>

              <div
                className={cn(
                  classes.short,
                  expanded ? classes.hidden : classes.visible
                )}
              >
                <ContentShort />
              </div>
              <div
                className={cn(
                  classes.long,
                  expanded ? classes.visible : classes.hidden
                )}
              >
                <ContentLong />
              </div>

            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default injectSheet(styles)(About)
