import React, {PureComponent, PropTypes} from 'react'
import Scene from '../canvas'

export default class DotSceneContainer extends PureComponent {
  static propTypes = {
    animated: PropTypes.boolean
  }

  componentDidMount() {
    this.scene = new Scene({
      container: this.canvas
    })
  }

  componentWillReceiveProps(nextProps) {
    // Start or stop animation
    if (nextProps.animated) this.scene.animateStart()
    else this.scene.animateStop()
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
