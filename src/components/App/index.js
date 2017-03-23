import React, {PureComponent, PropTypes} from 'react'

import GlobalStyles from '../GlobalStyles'
import Logo from '../Logo'
import SlidingPopup from '../SlidingPopup'
import DotScene from '../DotScene'

import injectSheet from '../../utils/jss'
import styles from './styles'

class App extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  // TO REMOVE
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  // TO REMOVE
  handleClick() {
    this.setState({
      loading: !this.state.loading
    })
  }

  render() {
    const {classes} = this.props

    return (
      <GlobalStyles>
        <div className={classes.app}>
          <div className={classes.content}>

            { /* Just a temporary button */ }
            <button
              onClick={this.handleClick}
              style={{
                position: 'relative',
                zIndex: 100,
                top: 100,
                left: 100
              }}
            >
              Toggle
            </button>

          </div>

          <SlidingPopup
            direction={'left'}
            title={'About me'}
            open={this.state.loading}
          >
            <div>Content</div>
          </SlidingPopup>
          <SlidingPopup
            direction={'right'}
            title={'Contact me'}
          >
            <div>Contact</div>
          </SlidingPopup>

          <div className={classes.logo}>
            {process.browser && <Logo loading={this.state.loading} />}
          </div>
          <div className={classes.scene}>
            {process.browser && <DotScene />}
          </div>
        </div>
      </GlobalStyles>
    )
  }
}

export default injectSheet(styles)(App)
