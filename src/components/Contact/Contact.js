import React, {Component, createElement} from 'react'
import withSizes from 'react-sizes'
import PropTypes from 'prop-types'
import AnimatedDisplayer from '../AnimatedDisplayer'
import injectSheet from '../../utils/jss'
import {xs as screenXs} from '../../constants/sizes'
import {mediaSm, mediaXs} from '../../constants/media'
import Container from '../Container'
import Row from '../Row'
import {Skype, Email, Twitter, Github, Linkedin} from '../icons'

const data = {
  skype: {
    label: 'Skype',
    text: 'typical000',
    href: 'skype:typical000?chat',
    component: Skype,
  },
  email: {
    name: 'email',
    label: 'Email',
    text: 'typical000@gmail.com',
    href: 'mailto:typical000@gmail.com',
    component: Email,
  },
  twitter: {
    label: 'Twitter',
    text: '@typical001',
    href: 'https://twitter.com/typical001',
    component: Twitter,
  },
  github: {
    label: 'GitHub',
    text: 'typical000',
    href: 'https://github.com/typical000',
    component: Github,
  },
  linkedin: {
    label: 'Linkedin',
    text: 'PavelDavydov',
    href: 'https://www.linkedin.com/in/pavel-davydov-09892aa5/',
    component: Linkedin,
  }
}

const styles = theme => ({
  contact: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
    marginTop: -8,
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
    top: -70,
    left: 100,
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
      display: 'none'
    }
  },
  [mediaXs]: {
    contact: {
      padding: 0,
    },
  }
})

/**
 * Don't set globally media queries inside small components.
 * We must control it's behaviour from parent components.
 * So we track screen size changes, and pass needed prop to children, updating it.
 */
const mapSizesToProps = ({width}) => ({
  isMobileSize: width && width <= screenXs // Can be null on SSR
})

class Contact extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isMobileSize: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      displayIcon: null
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
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

  render() {
    const {classes, isMobileSize} = this.props
    const {displayIcon} = this.state

    return (
      <Container
        title={'Contact'}
        positionX={'left'}
        positionY={'top'}
        noScroll
      >
        <div className={classes.contact}>
          {Object.keys(data).map(contact => (
            <div className={classes.row} key={contact}>
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
            </div>
          ))}
        </div>
        <div className={classes.background}>
          <AnimatedDisplayer>
            {displayIcon && createElement(data[displayIcon].component, {
              className: classes.icon
            })}
          </AnimatedDisplayer>
        </div>
      </Container>
    )
  }
}

export default withSizes(mapSizesToProps)(injectSheet(styles)(Contact))
