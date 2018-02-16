import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Scene from '../canvas'

export default class BackgroundSceneContainer extends Component {
  static propTypes = {
    animated: PropTypes.bool,
  }

  componentDidMount() {
    this.scene = new Scene(this.canvas)
  }

  componentWillReceiveProps(nextProps) {
    // Start or stop animation
    if (nextProps.animated) this.scene.start()
    else this.scene.stop()
  }

  shouldComponentUpdate() {
    // We really don't need to re-render component.
    // There is no real case.
    return false
  }

  render() {
    return (
      <canvas
        ref={(canvas) => {
          this.canvas = canvas
        }}
      />
    )
  }
}
