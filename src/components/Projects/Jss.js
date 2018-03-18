import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'

const styles = {
  container: {},
}

const Jss = ({classes}) => <div className={classes.work}>CONTENT</div>

Jss.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(Jss)
