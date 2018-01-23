import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'
import {mediaXs} from '../../constants/media'

const styles = theme => ({
  row: {
    position: 'relative',
  },
  label: {
    color: theme.text.muted,
    position: 'absolute',
    right: '100%',
    marginBottom: 3,
    marginRight: 10,
    bottom: 0,
  },
  bold: {
    font: {
      weight: 'bold',
      size: 24,
    },
  },
  separator: {
    composes: '$bold',
    color: theme.brand,
    paddingRight: 10,
  },
  link: {
    composes: '$bold',
    transition: transition(),
    color: theme.text.default,
    textDecoration: 'none',
    '&:hover': {
      color: theme.brand,
    },
  },
  [mediaXs]: {
    label: {
      position: 'static',
      display: 'block',
      fontSize: 12,
    },
    bold: {
      fontSize: 15,
    },
  },
})

const Row = ({classes, label, value, href}) => (
  <div className={classes.row}>
    <span className={classes.label}>{label}</span>
    <span className={classes.separator}>{'//'}</span>
    <a className={classes.link} href={href} target={'_blank'}>{value}</a>
  </div>
)

Row.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

Row.defaultProps = {
  label: '',
}

export default injectSheet(styles)(Row)
