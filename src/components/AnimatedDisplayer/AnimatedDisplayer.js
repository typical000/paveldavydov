import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translate} from 'css-functions'
import injectSheet from '../../utils/jss'

const ANIMATION_SPEED = 200

const styles = {
  displayer: {
    position: 'relative',
  },

  appear: {
    animation: {
      name: 'appear',
      duration: `${ANIMATION_SPEED}ms`,
      timingFunction: 'linear',
      direction: 'alternate',
    }
  },

  // Appearing animation
  '@keyframes appear': {
    from: {
      opacity: 0,
      transform: translate(20, 0),
    },
    to: {
      opacity: 1,
      transform: translate(0, 0),
    },
  },
}

/**
 * Helper class for facilitating showing
 * of children elements with fade in animation
 */
class AnimatedDisplayer extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
    this.state = {
      appearing: false
    }
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeout)

    if (!nextProps.children) {
      this.setState({appearing: false})
      return
    }

    this.setState({appearing: true})
  }

  componentWillUpdate() {
    const {appearing} = this.state

    if (!appearing) return
    this.timeout = setTimeout(() => {
      this.setState({
        appearing: false
      })
    }, ANIMATION_SPEED)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const {classes, children} = this.props
    const {appearing} = this.state

    return (
      <div className={cn(classes.displayer, appearing && classes.appear)}>
        {children}
      </div>
    )
  }
}

export default injectSheet(styles)(AnimatedDisplayer)
