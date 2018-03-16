import React from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'
import ParallaxLayer from '../ParallaxMousemove'
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

const ContentShort = ({classes, animateParallax}) => {
  const xFactor = animateParallax ? 0.1 : 0
  const yFactor = animateParallax ? 0.2 : 0
  return (
    <div>
      <ParallaxLayer xFactor={xFactor} yFactor={yFactor}>
        <H1>Pavel Davydov</H1>
      </ParallaxLayer>
      <ParallaxLayer xFactor={xFactor} yFactor={xFactor}>
        <div className={classes.row}>
          <Row value={email.text} href={email.href} />
        </div>
        <div className={classes.row}>
          <Row value={twitter.text} href={twitter.href} />
        </div>
      </ParallaxLayer>
      <ParallaxLayer xFactor={xFactor} yFactor={yFactor}>
        <div className={classes.action}>
          <Link href={resumeUrl} target={'_blank'} className={classes.link}>
            Get my resume
          </Link>
        </div>
      </ParallaxLayer>
    </div>
  )
}

ContentShort.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  animateParallax: PropTypes.bool,
}

ContentShort.defaultProps = {
  animateParallax: false,
}

export default injectSheet(styles)(ContentShort)
