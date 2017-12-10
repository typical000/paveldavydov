import React, {PropTypes} from 'react'
import injectSheet from '../../utils/jss'

const styles = {
  contact: {
    fontSize: 24
  },
}

const Contact = ({classes}) => (
  <div className={classes.contact}>
    Contact
  </div>
)

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(Contact)
