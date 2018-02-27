import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {translate, translateX, scale, multiple} from 'css-functions'
import {animateProjectSelection} from './animations'
import Work from './Work'
import injectSheet from '../../utils/jss'

// TODO: Move to constants
const allWork = [
  {
    project: 'first',
    image: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    imageLarge: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    title: 'First work',
    info: 'Design, Development, contributing to Open Source',
  },
  {
    project: 'second',
    image: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    imageLarge: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    title: 'Second work',
    info: 'Design and Development',
  },
  {
    project: 'third',
    image: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    imageLarge: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    title: 'Third work',
    info: 'Design and Development',
  },
  {
    project: 'fourth',
    image: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    imageLarge: 'https://www.hdwallpapers.in/walls/black_cat-HD.jpg',
    title: 'Fourth work',
    info: 'Design and Development',
  },
]

const slideWidth = 500

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  foreground: {
    willChange: 'transform',
    position: 'relative',
    zIndex: 2,
    transform: ({foregroundOffsetX}) => translateX(foregroundOffsetX),
  },
  slider: {
    overflow: 'visible',
    width: slideWidth,
    margin: [60, 'auto', 0],
  },
  slide: {
    width: slideWidth,
  },
  backgroundSlide: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 'auto',
    height: '100%',
    filter: ({backgroundGrayscale}) => `grayscale(${backgroundGrayscale}%)`,
    opacity: ({backgroundOpacity}) => backgroundOpacity,
    transform: ({backgroundScale}) => multiple(
      translate('-50%', '-50%'),
      scale(backgroundScale, backgroundScale),
    ),
  },
}

class WorkLayout extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    sheet: PropTypes.object.isRequired, // eslint-disable-line
  }

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      switching: false,
      activeProject: null,
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleSlideSwitching = this.handleSlideSwitching.bind(this)
    this.handleSlideSwitched = this.handleSlideSwitched.bind(this)
    this.handleProjectMouseDown = this.handleProjectMouseDown.bind(this)
  }

  componentWillMount() {
    this.props.sheet.update({
      foregroundOffsetX: 0,
      backgroundGrayscale: 100,
      backgroundOpacity: 0.05,
      backgroundScale: 0.6,
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activeProject === nextState.activeProject) {
      return
    }

    animateProjectSelection({
      sheet: this.props.sheet,
      slidesOffsetDistance: this.foreground.offsetWidth * allWork.length * 2,
    })
  }

  handleChangeIndex(index) {
    this.setState({activeIndex: index})
  }

  handleSlideSwitching() {
    if (!this.state.switching) {
      this.setState({switching: true})
    }
  }

  handleSlideSwitched() {
    this.setState({switching: false})
  }

  handleProjectMouseDown(e) {
    // Don't use setState for internal, utilitary calculations
    this.offsetX = e.screenX
  }

  handleProjectSelection(project, e) {
    const delta = Math.abs(e.screenX - this.offsetX)
    // If mouse was moved more - ignore click
    if (delta > 10) return

    this.setState({activeProject: project})
  }

  render() {
    const {classes} = this.props
    const {activeIndex, switching} = this.state

    return (
      <div className={classes.container}>
        <div className={classes.background}>
          <SwipeableViews index={activeIndex}>
            {allWork.map(({imageLarge}, index) => (
              <div className={classes.backgroundSlide} key={index}>
                <img
                  className={classes.image}
                  src={imageLarge}
                  role="presentation"
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
        <div
          className={classes.foreground}
          ref={(foreground) => {this.foreground = foreground}}
        >
          <SwipeableViews
            enableMouseEvents
            className={classes.slider}
            style={{overflowX: 'visible'}}
            onChangeIndex={this.handleChangeIndex}
            onSwitching={this.handleSlideSwitching}
            onTransitionEnd={this.handleSlideSwitched}
          >
            {allWork.map(({image, title, info, project}, index) => (
              <div className={classes.slide} key={index}>
                <Work
                  image={image}
                  title={title}
                  info={info}
                  index={index + 1}
                  first={index === 0}
                  last={index === allWork.length - 1}
                  focused={switching}
                  onMouseDown={this.handleProjectMouseDown}
                  onClick={event => this.handleProjectSelection(project, event)}
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles, {inject: ['classes', 'sheet']})(WorkLayout)
