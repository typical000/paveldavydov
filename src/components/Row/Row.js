import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from '../../utils/jss'
import {transition} from '../../utils/css'

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
  labelSmall: {
    fontSize: 12,
  },
  labelOnTop: {
    position: 'static',
    display: 'block',
  },
  bold: {
    font: {
      weight: 'bold',
      size: 20,
    },
  },
  separator: {
    composes: '$bold',
    color: theme.brand,
    paddingRight: 10,
  },
  separatorSmall: {
    composes: '$separator',
    fontSize: 15,
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
  linkSmall: {
    composes: '$link',
    fontSize: 15,
  },
})

const Row = ({
  classes,
  name,
  label,
  value,
  href,
  labelOnTop,
  small,
  onMouseEnter,
  onMouseLeave
}) => (
  <div className={classes.row}>
    <span
      className={cn(
        classes.label,
        labelOnTop && classes.labelOnTop,
        small && classes.labelSmall
      )}
    >
      {label}
    </span>
    <span className={small ? classes.separatorSmall : classes.separator}>{'//'}</span>
    <a
      className={small ? classes.linkSmall : classes.link}
      href={href}
      target={'_blank'}
      onMouseEnter={() => {
        onMouseEnter(name)
      }}
      onMouseLeave={() => {
        onMouseLeave(name)
      }}
    >
      {value}
    </a>
  </div>
)

Row.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string, // Like machine name
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  labelOnTop: PropTypes.bool,
  small: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

Row.defaultProps = {
  name: null,
  labelOnTop: false,
  small: false,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
}

export default injectSheet(styles)(Row)
