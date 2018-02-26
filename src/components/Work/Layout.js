import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import Work from './Work'
import injectSheet from '../../utils/jss'

// TODO: Move to constants
const allWork = [
  {
    project: 'first',
    image: 'http://mulderscreek.com/photos/enhanced-1312-1435088986-17.jpg',
    title: 'First work',
    info: 'Design, Development, contributing to Open Source',
  },
  {
    project: 'second',
    image: 'http://mulderscreek.com/photos/enhanced-1312-1435088986-17.jpg',
    title: 'Second work',
    info: 'Design and Development',
  },
  {
    project: 'third',
    image: 'http://mulderscreek.com/photos/enhanced-1312-1435088986-17.jpg',
    title: 'Third work',
    info: 'Design and Development',
  },
  {
    project: 'fourth',
    image: 'http://mulderscreek.com/photos/enhanced-1312-1435088986-17.jpg',
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
  },
  background: {
    opacity: 0.05,
    filter: 'grayscale(100%)',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foreground: {
    position: 'relative',
    zIndex: 2,
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
    width: '60vw',
    margin: [0, '20vw'],
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}

class WorkLayout extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      switching: false,
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleSlideSwitching = this.handleSlideSwitching.bind(this)
    this.handleSlideSwitched = this.handleSlideSwitched.bind(this)
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

  render() {
    const {classes} = this.props
    const {activeIndex, switching} = this.state

    return (
      <div className={classes.container}>
        <div className={classes.background}>
          <SwipeableViews index={activeIndex}>
            {allWork.map(({image}, index) => (
              <div className={classes.backgroundSlide} key={index}>
                <img
                  className={classes.image}
                  src={image}
                  role="presentation"
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
        <div className={classes.foreground}>
          <SwipeableViews
            enableMouseEvents
            className={classes.slider}
            style={{overflowX: 'visible'}}
            onChangeIndex={this.handleChangeIndex}
            onSwitching={this.handleSlideSwitching}
            onTransitionEnd={this.handleSlideSwitched}
          >
            {allWork.map(({image, title, info}, index) => (
              <div className={classes.slide} key={index}>
                <Work
                  image={image}
                  title={title}
                  info={info}
                  index={index + 1}
                  first={index === 0}
                  last={index === allWork.length - 1}
                  focused={switching}
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(WorkLayout)
