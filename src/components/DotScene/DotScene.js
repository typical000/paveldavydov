import React, {PropTypes} from 'react'
import {translate} from 'css-functions'
import {backgroundColorPrimary as evenColor, backgroundColorSecondary as oddColor} from '../../canvas/config'
import {decToRgba} from '../../canvas/utils/color'
import DotSceneContainer from '../../containers/DotScene'
import injectSheet from '../../utils/jss'

const styles = {
  scene: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  shadow: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '30%',
      height: '20%',
    },
  },
  even: {
    composes: '$shadow',
    '&::before': {
      background: `radial-gradient(100% 100% at top left, ${decToRgba(evenColor)} 50%, ${decToRgba(evenColor, 0)})`,
    },
    '&::after': {
      background: `radial-gradient(100% 100% at bottom right, ${decToRgba(evenColor)} 50%, ${decToRgba(evenColor, 0)})`,
      transform: translate('-100%', '-100%'),
    },
  },
  odd: {
    composes: '$shadow',
    '&::before': {
      background: `radial-gradient(100% 100% at top right, ${decToRgba(oddColor)} 50%, ${decToRgba(oddColor, 0)})`,
      transform: translate('-100%', 0),
    },
    '&::after': {
      background: `radial-gradient(100% 100% at bottom left, ${decToRgba(oddColor)} 50%, ${decToRgba(oddColor, 0)})`,
      transform: translate(0, '-100%'),
    },
  },
  container: {
    width: '100%',
    height: '100%',
  }
}

const DotScene = ({animated, classes}) => (
  <div className={classes.scene}>
    <div className={classes.even} />
    <div className={classes.odd} />
    <div className={classes.container}>
      <DotSceneContainer animated={animated} />
    </div>
  </div>
)

DotScene.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  animated: PropTypes.bool
}

export default injectSheet(styles)(DotScene)
