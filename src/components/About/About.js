import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import withSizes from 'react-sizes'
import AboutLarge from './AboutLarge'
import AboutSmall from './AboutSmall'
import Container from '../Container'
import {sm as screenSm} from '../../constants/sizes'

const mapSizesToProps = ({width}) => ({
  isMobileSize: width && width <= screenSm, // Can be null on SSR
})

class About extends PureComponent {
  static propTypes = {
    isMobileSize: PropTypes.bool,
    // For info, where we take 'active' props - see 'SlidingPopup'
    active: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isMobileSize: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      isClient: false,
    }
  }

  /**
   * The problem is with react-sizes and all logic
   * related on changing props if screen size changes.
   *
   * Root of all this is new breaking change in Rect 16 related
   * to 'hydrate' method. If DOM is the same but classes are not the same
   * React will ignore it and leave all markup as it was on server-side.
   *
   * This causes problems on mobile devices where on inital render
   * all goes rendered as on desktop.
   *
   * See more here: https://github.com/facebook/react/issues/10591
   * And the 'best' solution from Dan Abramov: https://github.com/facebook/react/issues/8017#issuecomment-256351955
   * As for me - it's a weird solution.
   *
   * Anyway - we avoid to render any markup on server,
   * and render it only on client. Causing double rendering
   */
  componentDidMount() {
    // eslint-disable-next-line
    this.setState({isClient: true})
  }

  render() {
    const {isMobileSize, active} = this.props
    const {isClient} = this.state

    return (
      <Container title={'About'} positionX={'right'} positionY={'bottom'}>
        {isClient &&
          (isMobileSize ? (
            <AboutSmall />
          ) : (
            <AboutLarge animateParallax={active} />
          ))}
      </Container>
    )
  }
}

export default withSizes(mapSizesToProps)(About)
