import React, {PureComponent, PropTypes} from 'react'

import GlobalStyles from '../GlobalStyles'
import Logo from '../Logo'
import About from '../About'
import Contact from '../Contact'
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
      aboutPopupActive: false,
      contactPopupActive: false,
      sceneAnimated: true,
      logoClosed: false,
    }

    this.toggleAboutPopup = this.toggleAboutPopup.bind(this)
    this.toggleContactPopup = this.toggleContactPopup.bind(this)
  }

  toggleAboutPopup() {
    this.setState({
      aboutPopupActive: !this.state.aboutPopupActive,
      sceneAnimated: !this.state.sceneAnimated,
      logoClosed: !this.state.logoClosed
    })
  }

  toggleContactPopup() {
    this.setState({
      contactPopupActive: !this.state.contactPopupActive,
      sceneAnimated: !this.state.sceneAnimated,
      logoClosed: !this.state.logoClosed
    })
  }

  render() {
    const {classes} = this.props

    return (
      <GlobalStyles>
        <div className={classes.app}>
          <div className={classes.content} />
          <SlidingPopup
            direction={'left'}
            title={'About me'}
            open={this.state.aboutPopupActive}
            toggleHandler={this.toggleAboutPopup}
          >
            <About />
          </SlidingPopup>
          <SlidingPopup
            direction={'right'}
            title={'Contact me'}
            open={this.state.contactPopupActive}
            toggleHandler={this.toggleContactPopup}
          >
            <Contact />
          </SlidingPopup>

          <div className={classes.logo}>
            {process.browser && <Logo
              loading={this.state.loading}
              closed={this.state.logoClosed}
            />}
          </div>
          <div className={classes.scene}>
            {process.browser && <DotScene animated={this.state.sceneAnimated} />}
          </div>
        </div>
      </GlobalStyles>
    )
  }
}

export default injectSheet(styles)(App)
