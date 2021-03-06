import React, {PureComponent, createElement} from 'react'
import PropTypes from 'prop-types'
import withSizes from 'react-sizes'
import {translate} from 'css-functions'
import AnimatedDisplayer from '../AnimatedDisplayer'
import injectSheet from '../../utils/jss'
import data from '../../constants/contacts'
import {xs as screenXs} from '../../constants/sizes'
import {mediaSm, mediaXs} from '../../constants/media'
import Container from '../Container'
import Row from '../Row'
import ParallaxLayer from '../ParallaxMousemove'

const styles = (theme) => ({
  contact: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
    marginTop: -8,
  },
  wrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    marginBottom: 25,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  background: {
    fill: theme.text.default,
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: translate(100, -70),
    opacity: 0.05,
  },
  icon: {
    width: 400,
    height: 400,
    maxWidth: 'none', // Reset default svg icon style
  },
  [mediaSm]: {
    contact: {
      position: 'static',
      paddingLeft: 100, // Label max width
      margin: 0,
    },
    // We don't need hoverable items on touch devices
    background: {
      display: 'none',
    },
  },
  [mediaXs]: {
    contact: {
      padding: 0,
    },
  },
})

/**
 * Don't set globally media queries inside small components.
 * We must control it's behaviour from parent components.
 * So we track screen size changes, and pass needed prop to children, updating it.
 */
const mapSizesToProps = ({width}) => ({
  isMobileSize: width && width <= screenXs, // Can be null on SSR
})

class Contact extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isMobileSize: PropTypes.bool,
    // For info, where we take 'active' props - see 'SlidingPopup'
    active: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      displayIcon: null,
      isClient: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  /**
   * The problem is with react-sizes and all logic
   * related on changing props if screen size changes.
   *
   * Root of all this is new breaking change in Rect 16 related
   * to 'hydrate' method. If DOM is the same but classes are not the same
   * React will ignore it and leave all markup as it was on server-side.
   *
   * This causes problems on mobile devices where on inital render
   * all goes rendered as on desktop.
   *
   * See more here: https://github.com/facebook/react/issues/10591
   * And the 'best' solution from Dan Abramov: https://github.com/facebook/react/issues/8017#issuecomment-256351955
   * As for me - it's a weird solution.
   *
   * Anyway - we avoid to render any contact data on server,
   * and render it only on client. Causing double rendering
   */
  componentDidMount() {
    // eslint-disable-next-line
    this.setState({isClient: true})
  }

  /**
   * @param {string} name
   */
  handleMouseEnter(name) {
    this.setState({displayIcon: name})
  }

  /**
   * @param {string} name
   */
  handleMouseLeave() {
    this.setState({displayIcon: null})
  }

  /**
   * Only render row with parallax in case if section became active
   * @param {string} contact
   * @param {number} index
   */
  renderRowWithParallax(contact, index) {
    return (
      <ParallaxLayer xFactor={0.02 * index + 0.1} yFactor={0.05 * index + 0.1}>
        {this.renderRow(contact)}
      </ParallaxLayer>
    )
  }

  /**
   * @param {string} contact
   */
  renderRow(contact) {
    const {isMobileSize} = this.props
    return (
      <Row
        name={contact}
        label={data[contact].label}
        value={data[contact].text}
        href={data[contact].href}
        labelOnTop={isMobileSize}
        small={isMobileSize}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }

  render() {
    const {classes, active} = this.props
    const {displayIcon, isClient} = this.state

    return (
      <Container title={'Contact'} positionX={'left'} positionY={'top'}>
        <div className={classes.wrap}>
          <div className={classes.contact}>
            {isClient &&
              Object.keys(data).map((contact, index) => (
                <div className={classes.row} key={index}>
                  {active
                    ? this.renderRowWithParallax(contact, index)
                    : this.renderRow(contact)}
                </div>
              ))}
          </div>
          <div className={classes.background}>
            <AnimatedDisplayer>
              {displayIcon &&
                createElement(data[displayIcon].component, {
                  className: classes.icon,
                })}
            </AnimatedDisplayer>
          </div>
        </div>
      </Container>
    )
  }
}

export default withSizes(mapSizesToProps)(injectSheet(styles)(Contact))
