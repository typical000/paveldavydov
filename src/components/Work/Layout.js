import React, {PureComponent, createElement} from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {isUndefined} from 'lodash'
import {translate, translateX, scale, multiple} from 'css-functions'
import {
  animateProjectSelection,
  setInitialAnimatedStyleProps,
} from './animations'
import stages from './stages'
import Preview from './Preview'
import Project from './Project'
import allWork from '../../constants/works'
import {slidingPopupSpeed} from '../../constants/animations'
import {mediaSm} from '../../constants/media'
import injectSheet from '../../utils/jss'

const slideWidth = 500

const displaySlidersValue = (display) => {
  if (isUndefined(display)) return 'flex'
  return display ? 'flex' : 'none'
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden', // Hide strange extra 10px scroll
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    display: ({displaySliders}) => displaySlidersValue(displaySliders),
  },
  foreground: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    willChange: 'transform',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transform: ({foregroundOffsetX}) => translateX(foregroundOffsetX),
    display: ({displaySliders}) => displaySlidersValue(displaySliders),
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
    transform: ({backgroundScale}) =>
      multiple(
        translate('-50%', '-50%'),
        scale(backgroundScale, backgroundScale),
      ),
  },
  project: {
    width: '100vw',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 5,
  },
  // Make slider fullwidth
  [mediaSm]: {
    slider: {
      width: '100%',
    },
    slide: {
      width: '100%',
    },
  },
}

class WorkLayout extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    sheet: PropTypes.object.isRequired, // eslint-disable-line
    active: PropTypes.bool.isRequired, // Used to animate back slider on close
  }

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      activeProject: null,
      stage: stages.LIST,
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.handleSlideSwitching = this.handleSlideSwitching.bind(this)
    this.handleSlideSwitched = this.handleSlideSwitched.bind(this)
    this.handleProjectMouseDown = this.handleProjectMouseDown.bind(this)
  }

  componentWillMount() {
    setInitialAnimatedStyleProps(this.props.sheet)
  }

  componentWillReceiveProps(nextProps) {
    // Take in sync stage state and possible closing animation coming from above
    if (this.props.active && !nextProps.active) {
      this.setState({stage: stages.PROJECT_TO_LIST})
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {sheet} = this.props
    const {stage} = this.state

    if (stage === nextState.stage) {
      return
    }

    if (nextState.stage === stages.LIST_TO_PROJECT) {
      animateProjectSelection({
        sheet,
        slidesOffsetDistance:
          this.foreground.offsetWidth * Object.keys(allWork).length * 2,
      })
        // This option means that we instantly render identical header
        // instead of animated background
        .then(() => {
          this.setState({stage: stages.PROJECT})
          this.props.sheet.update({
            displaySliders: false,
          })
        })

      return
    }

    if (nextState.stage === stages.PROJECT_TO_LIST) {
      setInitialAnimatedStyleProps(sheet)
      setTimeout(() => {
        this.setState({
          stage: stages.LIST,
          activeProject: null,
        })
      }, slidingPopupSpeed)
    }
  }

  handleChangeIndex(index) {
    this.setState({activeIndex: index})
  }

  handleSlideSwitching() {
    if (this.state.stage !== stages.SWITCHING) {
      this.setState({stage: stages.SWITCHING})
    }
  }

  handleSlideSwitched() {
    this.setState({stage: stages.LIST})
  }

  handleProjectMouseDown(e) {
    // Don't use setState for internal, utilitary calculations
    this.offsetX = e.screenX
  }

  handleProjectSelection(project, e) {
    const delta = Math.abs(e.screenX - this.offsetX)
    // If mouse was moved more - ignore click
    if (delta > 10) return

    this.setState({
      activeProject: project,
      stage: stages.LIST_TO_PROJECT,
    })
  }

  renderBackgroundSlider() {
    const {classes} = this.props
    const {activeIndex} = this.state

    return (
      <div className={classes.background}>
        <SwipeableViews index={activeIndex}>
          {Object.keys(allWork).map((project, index) => (
            <div className={classes.backgroundSlide} key={index}>
              <img
                className={classes.image}
                src={allWork[project].imageLarge}
                role="presentation"
              />
            </div>
          ))}
        </SwipeableViews>
      </div>
    )
  }

  renderForegroundSliderOrProject() {
    const {stage, activeProject} = this.state
    if (
      (stage === stages.PROJECT || stage === stages.PROJECT_TO_LIST) &&
      activeProject
    ) {
      return this.renderProject()
    }
    return this.renderForegoundSlider()
  }

  renderForegoundSlider() {
    const {classes} = this.props
    const switching = this.state.stage === stages.SWITCHING

    return (
      <div
        className={classes.foreground}
        ref={(foreground) => {
          this.foreground = foreground
        }}
      >
        <SwipeableViews
          enableMouseEvents
          className={classes.slider}
          style={{overflowX: 'visible'}}
          onChangeIndex={this.handleChangeIndex}
          onSwitching={this.handleSlideSwitching}
          onTransitionEnd={this.handleSlideSwitched}
        >
          {Object.keys(allWork).map((project, index) => {
            const {image, title, info} = allWork[project]

            return (
              <div className={classes.slide} key={index}>
                <Preview
                  image={image}
                  title={title}
                  info={info}
                  index={index + 1}
                  first={index === 0}
                  last={index === Object.keys(allWork).length - 1}
                  focused={switching}
                  onMouseDown={this.handleProjectMouseDown}
                  onClick={(event) =>
                    this.handleProjectSelection(project, event)
                  }
                />
              </div>
            )
          })}
        </SwipeableViews>
      </div>
    )
  }

  renderProject() {
    const {classes} = this.props
    const {component, imageLarge, title, info} = allWork[
      this.state.activeProject
    ]

    return (
      <div className={classes.project}>
        <Project image={imageLarge} title={title} info={info}>
          {createElement(component)}
        </Project>
      </div>
    )
  }

  render() {
    const {classes} = this.props

    // Don't remove ID attribute. It's needed for project scroll animation
    // @see Project
    return (
      <div className={classes.container} id="workLayoutContainer">
        {this.renderBackgroundSlider()}
        {this.renderForegroundSliderOrProject()}
      </div>
    )
  }
}

export default injectSheet(styles, {inject: ['classes', 'sheet']})(WorkLayout)
