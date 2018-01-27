import React, {Component} from 'react'
import withSizes from 'react-sizes'
import PropTypes from 'prop-types'
import {Displayer as IconDisplayer} from '../icons'
import injectSheet from '../../utils/jss'
import {xs as screenXs} from '../../constants/sizes'
import {mediaSm, mediaXs} from '../../constants/media'
import Container from '../Container'
import Row from '../Row'

const data = [
  {
    name: 'skype',
    label: 'Skype',
    text: 'typical000',
    href: 'skype:typical000?chat',
  }, {
    name: 'email',
    label: 'Email',
    text: 'typical000@gmail.com',
    href: 'mailto:typical000@gmail.com',
  }, {
    name: 'twitter',
    label: 'Twitter',
    text: '@typical001',
    href: 'https://twitter.com/typical001',
  }, {
    name: 'github',
    label: 'GitHub',
    text: 'typical000',
    href: 'https://github.com/typical000',
  }, {
    name: 'linkedin',
    label: 'Linkedin',
    text: 'PavelDavydov',
    href: 'https://www.linkedin.com/in/pavel-davydov-09892aa5/',
  }
]

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
    top: -50,
    left: 100,
    opacity: 0.05,
  },
  icon: {
    width: 500,
    height: 500,
    maxWidth: 'none', // Reset default svg icon style
  },
  [mediaSm]: {
    contact: {
      position: 'static',
      paddingLeft: 100, // Label max width
      margin: 0,
    },
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
          {data.map(contact => (
            <div className={classes.row} key={contact.name}>
              <Row
                name={contact.name}
                label={contact.label}
                value={contact.text}
                href={contact.href}
                labelOnTop={isMobileSize}
                small={isMobileSize}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              />
            </div>
          ))}
        </div>
        <div className={classes.background}>
          <IconDisplayer icon={displayIcon} className={classes.icon} />
        </div>
      </Container>
    )
  }
}

export default withSizes(mapSizesToProps)(injectSheet(styles)(Contact))
