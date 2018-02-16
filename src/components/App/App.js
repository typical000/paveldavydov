import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'css-functions'
import GlobalStyles from '../GlobalStyles'
import Logo from '../Logo'
import About from '../About'
import Contact from '../Contact'
import SlidingPopup, {SlidingPopupGroup} from '../SlidingPopup'
import BackgroundScene from '../../containers/BackgroundScene'
import injectSheet from '../../utils/jss'

const styles = (theme) => ({
  app: {
    background: theme.common.page,
    color: theme.text.default,
    overflow: 'hidden',
    minHeight: '100vh',
    letterSpacing: 2,
    font: {
      family: theme.typography.fontFamily,
      size: theme.typography.fontSize,
      lineHeight: theme.typography.lineHeight,
    },
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

  constructor(props) {
    super(props)
    this.state = {
      sceneAnimated: true,
      logoClosed: false,
      isClient: false,
    }

    this.togglePopupChange = this.togglePopupChange.bind(this)
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({isClient: true})
  }

  togglePopupChange(opened) {
    this.setState({
      sceneAnimated: !opened,
      logoClosed: opened,
    })
  }

  render() {
    const {isClient} = this.state
    const {classes} = this.props

    return (
      <GlobalStyles>
        <div className={classes.app}>
          <SlidingPopupGroup onChange={this.togglePopupChange}>
            <SlidingPopup
              name={'aboutMe'}
              direction={'left'}
              title={'About me'}
            >
              <About />
            </SlidingPopup>
            <SlidingPopup
              name={'contactMe'}
              direction={'right'}
              title={'Contact me'}
            >
              <Contact />
            </SlidingPopup>
          </SlidingPopupGroup>
          <div className={classes.logo}>
            {isClient && (
              <Logo
                loading={this.state.loading}
                closed={this.state.logoClosed}
              />
            )}
          </div>
          <div className={classes.scene}>
            {isClient && (
              <BackgroundScene animated={this.state.sceneAnimated} />
            )}
          </div>
        </div>
      </GlobalStyles>
    )
  }
}

export default injectSheet(styles)(App)
