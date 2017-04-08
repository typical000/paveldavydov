import React from 'react'

import injectSheet from '../../utils/jss'
import styles from './styles'

const About = ({classes}) => (
  <div className={classes.about}>
    About
  </div>
)

About.propTypes = {
  classes: React.PropTypes.object.isRequired,
}

export default injectSheet(styles)(About)
