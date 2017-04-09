import React, {PureComponent, PropTypes} from 'react'

import ScrollScreen from '../ScrollScreen'
import Link from '../Link'

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
              <h1 className={classes.name}>
                Pavel Davydov
              </h1>
              <h2 className={classes.quote}>
                Front-end Developer and Designer
              </h2>
              <div className={classes.mail}>
                <Link href={`mailto:${mail}`}>
                  {mail}
                </Link>
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
          Bottom text
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(About)
