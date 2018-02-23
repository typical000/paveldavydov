import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'

const styles = {
  container: {},
}

const Work = ({classes}) => <div className={classes.container}>Work</div>

Work.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(Work)
