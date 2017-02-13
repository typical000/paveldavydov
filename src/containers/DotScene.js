// import React, {PureComponent, PropTypes} from 'react'
import React, {PureComponent} from 'react'
import Scene from '../canvas'

export default class DotSceneContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // >>> INIT HERE and make scene as singleton

    this.scene = new Scene({
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
