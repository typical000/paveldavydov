import React from 'react'
import PropTypes from 'prop-types'
import ContentLong from './ContentLong'
import injectSheet from '../../utils/jss'

const styles = {
  container: {
    padding: 30,
    display: 'flex',
    alignItems: 'center',
    minHeight: '100%',
    boxSizing: 'border-box',
  },
}

const AboutSmall = ({classes}) => (
  <div className={classes.container}>
    <ContentLong />
  </div>
)

AboutSmall.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(AboutSmall)
