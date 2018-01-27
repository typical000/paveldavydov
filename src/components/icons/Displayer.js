// import React, {Component, createElement} from 'react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {Github} from '../icons'
import injectSheet from '../../utils/jss'

const styles = {
  displayer: {
    position: 'relative',
  }
}

class Displayer extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    icon: PropTypes.string,
  }

  static defaultProps = {
    className: null,
    icon: null,
  }

  render() {
    const {icon, classes} = this.props

    console.log(this.props.className)
    // console.log('>>> ' + icon)

    // We can't return anything
    if (!icon) return <div />

    // TODO: Find a way to render any type of component.
    // Maybe pass class as prop?
    // return createElement(Github, {
    //   className: this.props.className
    // })

    return <div className={classes.displayer} />
  }
}

export default injectSheet(styles)(Displayer)
