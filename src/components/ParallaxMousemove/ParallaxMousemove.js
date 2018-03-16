import React, {PureComponent} from 'react'
import EventListener from 'react-event-listener'
import PropTypes from 'prop-types'
import cn from 'classnames'
import {translate} from 'css-functions'
import injectSheet from '../../utils/jss'

const styles = {
  layer: {
    transform: ({x, y}) => translate(x, y),
    transition: {
      speed: 200,
      easing: 'ease',
    },
  },
}

class ParallaxMousemove extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    sheet: PropTypes.object.isRequired, // eslint-disable-line
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    xFactor: PropTypes.number,
    yFactor: PropTypes.number,
  }

  static defaultProps = {
    className: '',
    xFactor: 0,
    yFactor: 0,
  }

  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseMove({clientX, clientY}) {
    const {xFactor, yFactor} = this.props

    // Avoid updating stylesheets if there is no offset
    if (!xFactor && !yFactor) {
      return
    }

    this.props.sheet.update({
      // Magic numbers ;)
      x: (window.innerWidth / 2 - clientX) * (xFactor / 12),
      y: (window.innerHeight / 2 - clientY) * (yFactor / 12),
    })
  }

  render() {
    const {children, className, classes} = this.props

    return (
      <div className={cn(classes.layer, className)}>
        <EventListener target="window" onMouseMove={this.handleMouseMove}>
          {children}
        </EventListener>
      </div>
    )
  }
}

export default injectSheet(styles, {inject: ['classes', 'sheet']})(
  ParallaxMousemove,
)
