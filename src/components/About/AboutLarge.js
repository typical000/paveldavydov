import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translate} from 'css-functions'
import Switcher from './Switcher'
import ContentShort from './ContentShort'
import ContentLong from './ContentLong'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'

const TRANSITION_DURATION = 400

const styles = (theme) => ({
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

class AboutLarge extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    animateParallax: PropTypes.bool,
  }

  static defaultProps = {
    animateParallax: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
    this.toggleContent = this.toggleContent.bind(this)
  }

  toggleContent() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {classes, animateParallax} = this.props
    const {expanded} = this.state

    return (
      <div className={classes.about}>
        <Switcher
          onClick={this.toggleContent}
          activated={expanded}
          animateParallax={animateParallax}
        />
        <div className={classes.photo} />
        <div className={classes.column}>
          <div className={classes.content}>
            <div
              className={cn(
                classes.short,
                expanded ? classes.hidden : classes.visible,
              )}
            >
              <ContentShort animateParallax={animateParallax} />
            </div>
            <div
              className={cn(
                classes.long,
                expanded ? classes.visible : classes.hidden,
              )}
            >
              <ContentLong />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(AboutLarge)
