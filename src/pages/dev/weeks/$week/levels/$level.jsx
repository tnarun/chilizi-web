import React from 'react'
// import css from './index.scss'

import View from '../components/View'
import Levels from '../components/Levels'
import Runs from '../components/Runs'

import moment from 'moment'
import DailyStore from '../../../../../components/daily/DailyStore'

export default class $week extends React.Component {
  constructor (props) {
    super(props)

    let level = props.match.params.level
    let weekStr = props.match.params.week
    weekStr = weekStr.replace('w', 'W')
    let from = moment(weekStr).add(-2, 'day').format('YYYY-MM-DD')
    let to = moment(weekStr).add(4, 'day').format('YYYY-MM-DD')

    this.store = new DailyStore({ from, to })
    
    let { page } = props.location.query
    page = page || 1

    this.state = {
      level, weekStr, from, to, page,
      loaded: false
    }
  }

  render () {
    let data = this.state.data

    return <View { ... this.props } type='leaderboard'>
      <Levels level={ this.state.level } weekStr={ this.state.weekStr }>
        {
          this.state.loaded ? <Runs data={ data } page={ this.state.page } /> : null
        }
      </Levels>
    </View>
  }

  async componentDidMount () {
    await this.store.load()

    let { level } = this.state
    let data = this.store.typeData[level]
    try {
      window.setLBCount(data.length)
    } catch (e) {}

    this.setState({ loaded: true, data })
  }
}