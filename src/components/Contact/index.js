import React from 'react'

import injectSheet from '../../utils/jss'
import styles from './styles'

const Contact = ({classes}) => (
  <div className={classes.contact}>
    Contact
  </div>
)

Contact.propTypes = {
  classes: React.PropTypes.object.isRequired,
}

export default injectSheet(styles)(Contact)
