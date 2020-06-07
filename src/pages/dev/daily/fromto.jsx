import React from 'react'
import css from './fromto.scss'

import DailyStore from '../../../components/daily/DailyStore'
import DailyRuns from '../../../components/daily/DailyRuns'
import DailyStat from '../../../components/daily/DailyStat'

export default class Daily extends React.Component {
  constructor (props) {
    super(props)
    // console.log(props)
    let { from, to } = this.props.location.query
    let store = new DailyStore({ from, to })
    this.store = store

    this.state = {
      loaded: false
    }
  }

  render () {
    return <div className={ css.Daily }>
      <h2>speedrun 速通周报 { this.store.from } 至 { this.store.to }</h2>
      {
        this.state.loaded ? <>
          <DailyStat store={ this.store } />
          <DailyRuns store={ this.store } type='A' />
          <DailyRuns store={ this.store } type='B' />
          <DailyRuns store={ this.store } type='C' />
          {/* <DailyRuns store={ this.store } type='D' /> */}
          {/* <DailyRuns store={ this.store } type='E' /> */}
          {/* <DailyRuns store={ this.store } type='Z' /> */}
        </> : null
      }
    </div>
  }

  async componentDidMount () {
    await this.store.load()
    this.setState({ loaded: true })
    window.document.title = `吃栗子 - ${ this.store.from } 至 ${ this.store.to }`
  }
}