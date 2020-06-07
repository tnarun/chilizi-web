import React from 'react'
import css from './$id.scss'

// import RunInfo from '../../../components/RunInfo'
import RunBrief from '../../../components/RunBrief'
// import RunInfoSquare from '../../../components/RunInfoSquare'

import getRunDetail from '../../../api/speedrun/getRunDetail'
import SpeedrunUtils from "speedrun-utils"

const { RunData, GameData, LeaderboardData } = SpeedrunUtils.data
const time = SpeedrunUtils.time

class RunDetailStore {
  constructor ({ id }) {
    this.params = { id }
  }

  async load () {
    let { id } = this.params
    let data = await getRunDetail({ runId: id })
    this.data = data

    this.run = new RunData(this.data.run)
    this.game = new GameData(this.data.run.game.data)
    this.leaderboard = new LeaderboardData(this.data.leaderboard)
  }
}

export default class  extends React.Component {
  constructor (props) {
    super(props)
    let id = this.props.match.params.id
    let store = new RunDetailStore({ id })
    this.store = store

    this.state = {
      loaded: false
    }
  }

  render () {
    if (!this.state.loaded) {
      return <div className={ css.run }>
        loading
      </div>
    }

    return <div className={ css.run }>
      <div className={ css.main1 }>
        {/* <RunInfoSquare store={ this.store } /> */}
        <RunBrief store={ this.store } />
      </div>
      <div className={ css.main1 }>
        <PPTStr store={ this.store } />
      </div>
      <div className={ css.main1 }>
        <BiliDesc store={ this.store } />
      </div>
    </div>
  }

  async componentDidMount () {
    await this.store.load()
    console.log(this.store.data)
    this.setState({ loaded: true })
  }
}

class BiliDesc extends React.Component {
  render () {
    let { store } = this.props

    let run = store.run
    let run1 = store.leaderboard.getRunDataByIndex(0)
    let run2 = store.leaderboard.getRunDataByIndex(1)
    let run3 = store.leaderboard.getRunDataByIndex(2)

    return <div className={ css.BiliDesc }>
      <pre>{ run.videoTitle }</pre>

      <h3>当前 run</h3>
      <pre>{ run.detailDesc }</pre>

      <h3>第一名</h3>
      <pre>{ run1.detailDesc }</pre>

      {
        run2 ? <>
          <h3>第二名</h3>
          <pre>{ run2.detailDesc }</pre>
        </> : null
      }

      {
        run3 ? <>
          <h3>第三名</h3>
          <pre>{ run3.detailDesc }</pre>
        </> : null
      }

      <SimpleHistory run={ run1 } />
    </div>
  }
}

class SimpleHistory extends React.Component {
  render () {
    let _history = this.state.history.map(x => {
      // let s = x.submitted ? moment(x.submitted).utcOffset(8).format('YYYY-MM-DD') : ''
      let s = x.date

      return <div className={ css.line } key={ x.runId }>
        <span className={ css.time }>{ time.playTimeStr(x.duration) }</span>
        <span className={ css.runner }>{ x.runner }</span>
        <span className={ css.date }>{ s }</span>
      </div>
    })

    let { run } = this.props

    return <div className={ css.SimpleHistory }>
      <h3>{ run.gameName } - { run.fullCategoryDesc }</h3>
      <h3>最佳成绩更新历史 (共 { _history.length } 个)</h3>
      <div className={ css.head }>
        <span className={ css.timeH }>时长</span>
        <span className={ css.runnerH }>Runner</span>
        <span className={ css.dateH }>提交日期</span>
      </div>
      { _history }
    </div>
  }

  state = {
    history: []
  }

  async componentDidMount () {
    let url = this.props.run.simpleHistoryOSSURL
    let res = await fetch(url)
    let data = await res.json()
    this.setState({ history: data })
  }
}

class PPTStr extends React.Component {
  render () {
    let { store } = this.props
    let run = store.run

    return <div className={ css.PPTStr }>
      <div className={ css.c }>
        <span>{ run.categoryName }</span>
        {
          run.subCategorieNames ? <>
            <span className={ css.subC }> - </span>
            <span className={ css.subC }>{ run.subCategorieNames }</span>
          </> : null
        }
      </div>
      <div>
        <span className={ css.time }>{ run.timeStr }</span>
        <span> by </span>
        <span className={ css.runner }>{ run.runnersName }</span>
        <span> on </span>
        <span className={ css.date }>{ run.date }</span>
      </div>
    </div>
  }
}