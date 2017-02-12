import React, {PureComponent, PropTypes} from 'react'
// import {browserHistory as history} from 'react-router'

import injectSheet from '../../utils/jss'
import styles from './styles'

class Page extends PureComponent {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    // params: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.a = 1
  }

  render() {
    const {
      sheet: {classes},
      // params
    } = this.props

    return (
      <div className={classes.page}>
        <div className={classes.content}>

          { 'lol' }

        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(Page)
