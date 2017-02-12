// import React, {PureComponent, PropTypes} from 'react'
import React, {PureComponent} from 'react'
import DotScene from '../canvas/DotScene'

export default class DotSceneContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // >>> INIT HERE and make scene as singleton

    this.scene = new DotScene({
      container: this.canvas
    })
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
