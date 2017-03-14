import React, {PropTypes} from 'react'

import DotSceneContainer from '../../containers/DotScene'
import injectSheet from '../../utils/jss'
import styles from './styles'

const App = (props) => {
  const {classes} = props

  return (
    <div className={classes.scene}>
      <div className={classes.even} />
      <div className={classes.odd} />
      <div className={classes.container}>
        <DotSceneContainer />
      </div>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default injectSheet(styles)(App)
