import React, {PureComponent, PropTypes} from 'react'
import {translate} from 'css-functions'

import GlobalStyles from '../GlobalStyles'
import Logo from '../Logo'
import About from '../About'
import Contact from '../Contact'
import SlidingPopup from '../SlidingPopup'
import DotScene from '../DotScene'

import injectSheet from '../../utils/jss'

const styles = theme => ({
  app: {
    background: theme.common.page,
    color: theme.text.default,
    overflow: 'hidden',
    minHeight: '100vh',
    font: {
      family: theme.typography.fontFamily,
      size: theme.typography.fontSize,
      lineHeight: theme.typography.lineHeight,
    }
  },
  scene: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  logo: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: translate('-50%', '-50%'),
    zIndex: 10,
  },
})

class App extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
