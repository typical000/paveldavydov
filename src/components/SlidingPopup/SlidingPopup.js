import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Close from '../Close'
import {capitalizeFirstLetter} from '../../utils/text'
import injectSheet from '../../utils/jss'
import styles from './styles'

class SlidingPopup extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    direction: PropTypes.string,
    active: PropTypes.bool,
    hidden: PropTypes.bool,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    direction: 'left',
    active: false,
    hidden: false,
    onToggle: () => {}
  }

  constructor(props) {
    super(props)

    this.direction = capitalizeFirstLetter(this.props.direction)
    this.state = {
      hovered: false
    }

    this.handleCloseEnter = this.handleCloseEnter.bind(this)
    this.handleCloseLeave = this.handleCloseLeave.bind(this)
  }

  handleCloseEnter() {
    this.setState({hovered: true})
  }

  handleCloseLeave() {
    this.setState({hovered: false})
  }

  render() {
    const {classes, children, title, name, active, hidden} = this.props
    const direction = this.direction

    const popupClasses = cn(
      classes[`popup${direction}`],
      active && classes.active
    )

    return (
      <div className={popupClasses}>
        <button
          className={cn(
            classes[`barActive${direction}`],
            hidden && classes.hidden
          )}
          onClick={() => {
            this.props.onToggle(name)
          }}
        >
          <div className={classes[`title${direction}`]}>
            {title}
          </div>
        </button>
        <div className={classes[`content${direction}`]}>
          <button
            className={cn(
              classes[`barClose${direction}`],
              hidden && classes.hidden
            )}
            onClick={() => {
              this.props.onToggle(null)
            }}
            onMouseEnter={this.handleCloseEnter}
            onMouseLeave={this.handleCloseLeave}
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
