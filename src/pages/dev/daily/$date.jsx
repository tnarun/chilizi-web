import React from 'react'
import css from './$date.scss'
import moment from 'moment'

import SpeedrunUtils from "speedrun-utils"

const { RunData, LeaderboardData } = SpeedrunUtils.data

class DailyStore {
  constructor({ date }) {
    this.date = date
  }

  async load () {
    let url = this.date.includes('w-') ? 
      `http://tna-upload.oss-cn-shanghai.aliyuncs.com/speedrun-weekly-leaderboard-runs-data/weeks/${this.date.replace('w-', '')}-week-detail.json` :
      `http://tna-upload.oss-cn-shanghai.aliyuncs.com/speedrun-weekly-leaderboard-runs-data/${this.date}-detail.json`

    let res = await fetch(url)
    let data = await res.json()

    this.data = data
      .map(x => new DailyItem(x))
      .sort((a, b) => {
        return b.leaderboardLength - a.leaderboardLength
      })
  }
}

class DailyItem {
  constructor (data) {
    this.run = new RunData(data.run)
    this.leaderboard = new LeaderboardData(data.leaderboard)
  }

  get runId () {
    return this.run.id
  }

  get runLink () {
    return this.run.weblink
  }

  get devRunLink () {
    return `/dev/run/${this.runId}`
  }

  get ValuesDesc () {
    return this.run.subCategorieNames
  }

  get gameName () {
    return this.leaderboard.gameName
  }

  get categoryName () {
    return this.leaderboard.categoryName
  }

  get leaderboardLength () {
    return this.leaderboard.length
  }

  get leaderboardLink () {
    return this.leaderboard.weblink
  }
}

export default class Daily extends React.Component {
  constructor (props) {
    super(props)
    let date = this.props.match.params.date
    let store = new DailyStore({ date })
    this.store = store

    this.state = {
      loaded: false
    }
  }

  render () {
    return <div className={ css.Daily }>
      <div className={ css.main }>
        <h2>speedrun 速通日报 { this.store.date }</h2>
        {
          this.state.loaded ? <>
            <Stat store={ this.store } />
            <DailyRuns store={ this.store } />
          </> : null
        }
      </div>
    </div>
  }

  async componentDidMount () {
    await this.store.load()
    this.setState({ loaded: true })
  }
}

class Stat extends React.Component {
  render () {
    let store = this.props.store

    let days = this.state.days
    let _days = Object.keys(days)
      .sort((a, b) => moment(a) - moment(b))
      .map((date) => {
        return <div key={ date }>{ moment(date).format('M 月 D 日') }：{ days[date].length } 项</div>
      })

    console.log(days)

    let firstCount = store.data.filter(x => x.leaderboard.length === 1).length

    return <div className={ css.Stat }>
      <h3>数量统计</h3>
      <div>总纪录数：{ store.data.length }</div>
      { _days }
      <div>初次破纪录：{ firstCount }</div>
    </div>
  }

  state = {
    days: {}
  }

  componentDidMount () {
    let store = this.props.store

    let days = {}
    for(let d of store.data) {
      let date = d.run.data.date
      if (days[date]) {
        days[date].push(d)
      } else {
        days[date] = [d]
      }
    }

    console.log(days)

    this.setState({ days })
  }
}

class DailyRuns extends React.Component {
  render () {
    let _runs = this.props.store.data.map(item => {
      return <div className={ css.item } key={ item.runId }>
        <span>{ item.gameName }</span>
        <span>
          { item.categoryName }<br/>
          <span className={ css.sub }>{ item.ValuesDesc }</span>
        </span>
        <span>
          <a href={ item.leaderboardLink } target='_blank' rel='noopener noreferrer'>{ item.leaderboardLength }</a>
        </span>
        <span>
          <a href={ item.devRunLink } target='_blank' rel='noopener noreferrer'>{ item.runId }</a>
        </span>
        <span>
          <a href={ item.runLink } target='_blank' rel='noopener noreferrer'>[SR]</a>
        </span>
      </div>
    })
    
    return <div className={ css.DailyRuns }>
      <div className={ css.header }>
        <span>游戏</span><span>规则</span><span>榜单人数</span><span>链接</span><span>原链接</span>
      </div>
      <div className={ css.runs }>
        { _runs }
      </div>
    </div>
  }
}