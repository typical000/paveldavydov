import React, {PureComponent, PropTypes} from 'react'
import classnames from 'classnames'

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
      isOpen: props.open
    }

    this.handleBarClick = this.handleBarClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.open
    })
  }

  // REPLACE INNER STATE CHANGE
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  handleBarClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const {
      classes,
      children,
      title
    } = this.props

    const popupClasses = classnames({
      [classes[`popup${this.direction}`]]: true,
      [classes.open]: this.state.isOpen
    })

    return (
      <div className={popupClasses}>
        <button
          className={classes.barOpen}
          onClick={this.handleBarClick}
        >
          <div className={classes.title}>
            {title}
          </div>
        </button>
        <div className={classes.content}>
          <button
            className={classes.barClose}
            onClick={this.handleBarClick}
          >
            <div className={classes.close} />
          </button>
          <div className={classes.inner}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(SlidingPopup)
