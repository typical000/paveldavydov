import React, {PropTypes} from 'react'

import DotSceneContainer from '../../containers/DotScene'
import injectSheet from '../../utils/jss'
import styles from './styles'

const DotScene = ({animated, classes}) => {
  return (
    <div className={classes.scene}>
      <div className={classes.even} />
      <div className={classes.odd} />
      <div className={classes.container}>
        <DotSceneContainer animated={animated} />
      </div>
    </div>
  )
}

DotScene.propTypes = {
  classes: PropTypes.object.isRequired,
  animated: PropTypes.bool
}

export default injectSheet(styles)(DotScene)
