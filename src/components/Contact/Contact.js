import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import {mediaSm, mediaXs} from '../../constants/media'
import Container from '../Container'
import Row from '../Row'

const data = [
  {
    label: 'Skype',
    text: 'typical000',
    href: 'skype:typical000?chat',
  }, {
    label: 'Email',
    text: 'typical000@gmail.com',
    href: 'mailto:typical000@gmail.com',
  }, {
    label: 'Twitter',
    text: '@typical001',
    href: 'https://twitter.com/typical001',
  }, {
    label: 'GitHub',
    text: 'typical000',
    href: 'https://github.com/typical000',
  }, {
    label: 'Linkedin',
    text: 'PavelDavydov',
    href: 'https://www.linkedin.com/in/pavel-davydov-09892aa5/',
  }
]

const styles = {
  // TODO: Add media queries
  contact: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8
  },
  row: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
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
}

const Contact = ({classes}) => (
  <Container title={'Contact'} positionX={'left'} positionY={'top'}>
    <div className={classes.contact}>
      {/* TODO: Add hover icon for each row */}
      {data.map(contact => (
        <div className={classes.row} key={contact.label}>
          <Row
            label={contact.label}
            value={contact.text}
            href={contact.href}
          />
        </div>
      ))}
    </div>
  </Container>
)

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(Contact)
