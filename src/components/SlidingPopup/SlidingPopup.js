import React, {PureComponent, PropTypes} from 'react'
import cn from 'classnames'
import Close from '../Close'
import {capitalizeFirstLetter} from '../../utils/text'
import injectSheet from '../../utils/jss'
import styles from './styles'

class SlidingPopup extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    direction: PropTypes.string,
    open: PropTypes.boolean,
    toggleHandler: PropTypes.func
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

    this.onCloseEnter = this.onCloseEnter.bind(this)
    this.onCloseLeave = this.onCloseLeave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.open
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
    const {classes, children, title} = this.props
    const direction = this.direction
    const popupClasses = cn(
      classes[`popup${this.direction}`],
      this.state.isOpen && classes.open
    )

    return (
      <div className={popupClasses}>
        <button
          className={classes[`barOpen${direction}`]}
          onClick={this.props.toggleHandler}
        >
          <div className={classes[`title${direction}`]}>
            {title}
          </div>
        </button>
        <div className={classes[`content${direction}`]}>
          <button
            className={classes[`barClose${direction}`]}
            onClick={this.props.toggleHandler}
            onMouseEnter={this.onCloseEnter}
            onMouseLeave={this.onCloseLeave}
          >
            <div
              className={classes.close}
            >
              <Close hovered={this.state.hovered} />
            </div>
          </button>
          <div className={classes[`overlay${direction}`]}>
            <div className={classes[`overlayTop${direction}`]} />
            <div className={classes[`overlayBottom${direction}`]} />
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
