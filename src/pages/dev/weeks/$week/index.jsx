import React from 'react'
// import css from './index.scss'

import View from './components/View'
import Levels from './components/Levels'

export default class $week extends React.Component {
  render () {
    return <View { ... this.props }>
      <Levels />
    </View>
  }
}