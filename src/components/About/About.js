import React, {PureComponent, PropTypes} from 'react'
import ScrollScreen from '../ScrollScreen'
import {Link, H1, H2, H3} from '../typography'
import {scrollScreen} from '../../utils/dom'
import injectSheet from '../../utils/jss'

// TODO: Move to some external consts
const mail = 'typical000@gmail.com'

// TODO: Redesign needed
const styles = (theme) => ({
  about: {
    position: 'relative',
    height: '100%',
    overflowY: 'auto'
  },
  container: {
    position: 'relative'
  },
  containerTop: {
    composes: '$container',
    height: '100vh',
    overflow: 'hidden'
  },
  containerBottom: {
    composes: '$container',
    padding: 100,
    background: theme.common.card,
  },

  block: {
    boxSizing: 'border-box',
    float: 'left',
    height: '100%',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  blockPhoto: {
    composes: '$block',
    background: theme.common.card,
    width: '52%'
  },
  blockName: {
    composes: '$block',
    padding: [100, 100, 100, 50],
    width: '48%'
  },

  // Inner, smaller elements
  inner: {
    maxWidth: 600
  },
  mail: {
    marginTop: 40
  },
  content: {
    marginBottom: 40,
    '&:last-child': {
      marginBottom: 0
    }
  },

  // More button
  more: {
    position: 'absolute',
    bottom: 70,
    right: 60
  }
})

class About extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.onScrollClick = this.onScrollClick.bind(this)
  }

  onScrollClick = () => scrollScreen(this.container)

  render() {
    const {classes} = this.props

    return (
      <div
        className={classes.about}
        ref={container => (this.container = container)}
      >
        <div className={classes.containerTop}>
          <div className={classes.blockPhoto} />
          <div className={classes.blockName}>
            <div>
              <H1>Pavel Davydov</H1>
              <H3 light>Front-end Developer and Designer</H3>
              <div className={classes.mail}>
                <Link href={`mailto:${mail}`}>{mail}</Link>
              </div>
            </div>
            <div className={classes.more}>
              <ScrollScreen onClick={this.onScrollClick}>
                Read More
              </ScrollScreen>
            </div>
          </div>
        </div>
        <div className={classes.containerBottom}>
          <div className={classes.inner}>
            <H2>Hello,</H2>
            <div className={classes.content}>
              My name is Pavel Davydov and I am front-end developer
              and graphic designer based in&nbsp;
              <Link
                href="https://en.wikipedia.org/wiki/Zaporizhia"
                target="_blank"
              >
                Zaporizhia
              </Link>
              , Ukraine.
            </div>

            <H3>Open Source where I contribute</H3>

          </div>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(About)
