import {PureComponent, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'

class SlidingPopupGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      activePopup: null,
    }

    this.handleChildToggle = this.handleChildToggle.bind(this)
  }

  handleChildToggle(name) {
    this.setState({
      activePopup: name,
    })

    this.props.onChange(Boolean(name), name)
  }

  render() {
    const {activePopup} = this.state

    return Children.map(this.props.children, (child) =>
      cloneElement(child, {
        active: child.props.name === activePopup,
        hidden: activePopup && child.props.name !== activePopup,
        onToggle: this.handleChildToggle,
      }),
    )
  }
}

export default SlidingPopupGroup
