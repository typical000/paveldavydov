import React, {PureComponent, PropTypes} from 'react'
import cn from 'classnames'

import Close from '../Close'

import {capitalizeFirstLetter} from '../../utils/text'
import injectSheet from '../../utils/jss'
import styles from './styles'

class SlidingPopup extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    direction: PropTypes.string,
    open: PropTypes.boolean
  }

  static defaultProps = {
    direction: 'left'
  }

  constructor(props) {
    super(props)

    this.direction = capitalizeFirstLetter(this.props.direction)
    this.state = {
      isOpen: props.open,
      hovered: false
    }

    this.onClick = this.onClick.bind(this)
    this.onCloseEnter = this.onCloseEnter.bind(this)
    this.onCloseLeave = this.onCloseLeave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.open
    })
  }

  // REPLACE INNER STATE CHANGE
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  onClick() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onCloseEnter() {
    this.setState({
      hovered: true
    })
  }

  onCloseLeave() {
    this.setState({
      hovered: false
    })
  }

  render() {
    const {
      classes,
      children,
      title
    } = this.props

    const popupClasses = cn(
      classes[`popup${this.direction}`],
      this.state.isOpen && classes.open
    )

    return (
      <div className={popupClasses}>
        <button
          className={classes.barOpen}
          onClick={this.onClick}
        >
          <div className={classes.title}>
            {title}
          </div>
        </button>
        <div className={classes.content}>
          <button
            className={classes.barClose}
            onClick={this.onClick}
            onMouseEnter={this.onCloseEnter}
            onMouseLeave={this.onCloseLeave}
          >
            <div
              className={classes.close}
            >
              <Close hovered={this.state.hovered} />
            </div>
          </button>
          <div className={classes.overlay}>
            <div className={classes.overlayTop} />
            <div className={classes.overlayBottom} />
          </div>
          <div className={classes.inner}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(SlidingPopup)
