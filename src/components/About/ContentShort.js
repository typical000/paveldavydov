import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'
import {H1, Link} from '../typography'
import injectSheet from '../../utils/jss'
import {email, twitter, resumeUrl} from '../../constants/contacts'

const styles = {
  row: {
    marginBottom: 10,
  },
  action: {
    marginTop: 30,
  },
  link: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
}

const ContentShort = ({classes}) => (
  <div>
    <H1>Pavel Davydov</H1>
    <div className={classes.row}>
      <Row value={email.text} href={email.href} />
    </div>
    <div className={classes.row}>
      <Row value={twitter.text} href={twitter.href} />
    </div>
    <div className={classes.action}>
      <Link href={resumeUrl} target={'_blank'} className={classes.link}>
        Get my resume
      </Link>
    </div>
  </div>
)

ContentShort.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default injectSheet(styles)(ContentShort)
