import React from 'react'

import GlobalStyles from '../GlobalStyles'
import Page from '../Page'
import DotSceneContainer from '../../containers/DotScene'

import injectSheet from '../../utils/jss'
import styles from './styles'


const App = (props) => {
  // const {children, location, sheet: {classes}} = props
  const {sheet: {classes}} = props

  return (
    <GlobalStyles>
      <div className={classes.app}>
        <div className={classes.content}>
          { /* REPLACE with NavigationRouter */ }
          <Page />
        </div>
        <div className={classes.scene}>
          <DotSceneContainer />
        </div>
      </div>
    </GlobalStyles>
  )
}

App.propTypes = {
  // location: React.PropTypes.object.isRequired,
  sheet: React.PropTypes.object.isRequired,
  // children: React.PropTypes.node
}

export default injectSheet(styles)(App)
