import React, {PureComponent, PropTypes} from 'react'

import ScrollScreen from '../ScrollScreen'
import {Link, Heading1, Heading2, Heading3} from '../typography'

import {scrollScreen} from '../../utils/dom'
import injectSheet from '../../utils/jss'
import styles from './styles'

// TODO: Move to some external consts
const mail = 'typical000@gmail.com'

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
              <Heading1>Pavel Davydov</Heading1>
              <Heading3 light>Front-end Developer and Designer</Heading3>
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
            <Heading2>Hello,</Heading2>
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

            <Heading3>Open Source where I contribute</Heading3>

          </div>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(About)
