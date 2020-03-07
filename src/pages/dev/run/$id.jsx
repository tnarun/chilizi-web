import React from 'react'
import css from './$id.scss'

import getRunDetail from '../../../api/speedrun/getRunDetail'
import SpeedrunUtils from "speedrun-utils"

const { RunData, GameData, LeaderboardData } = SpeedrunUtils.data

const encn = (abbr) => {
  let name = {
    'bloodborne': '血源诅咒',
    'ff7r': '最终幻想 7 重制版',
    'tr2': '古墓丽影 2'
  }[abbr]

  return name ? name : abbr
}

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
        <div className={ css.main }>loading</div>
      </div>
    }

    return <div className={ css.run }>
      <div className={ css.main }>
        <Header store={ this.store } />
      </div>
      <div className={ css.main }>
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

class Header extends React.Component {
  render () {
    let store = this.props.store

    let run1st = store.leaderboard.getRunDataByIndex(0)
    let run2nd = store.leaderboard.getRunDataByIndex(1)
    let run3rd = store.leaderboard.getRunDataByIndex(2)

    return <div className={ css.Header }>
      <div className={ css.cover }>
        <img src={ store.game.coverHKURL } alt='cover' />
      </div>

      <div className={ css.infos }>        
        <div className={ css.info }>
          <span className={ css.name }>{ encn(store.game.abbreviation) } - { store.game.name }</span>
          <span className={ css.category }>{ store.run.fullCategoryDesc }</span>
        </div>
        <div className={ css.total }>
          <span>榜单总人数: { store.leaderboard.runs.length }</span>
        </div>
        <div className={ css.mingci }>
          <div className={ css.m1 }>
            <label>
              <span>第</span><span className={ css.n }>1</span><span>名</span>
            </label>
            <div className={ css.data }>
              <div className={ css.time }>{ run1st.timeStr }</div>
              <div className={ css.runner }>{ run1st.runnersName }</div>
              <div className={ css.date }>{ run1st.date }</div>
            </div>
          </div>
          <div className={ css.m2 }>
            <label>
              <span>第</span><span className={ css.n }>2</span><span>名</span>
            </label>
            <div className={ css.data }>
              <div className={ css.time }>{ run2nd.timeStr }</div>
              <div className={ css.runner }>{ run2nd.runnersName }</div>
              <div className={ css.date }>{ run2nd.date }</div>
            </div>
          </div>
          <div className={ css.m3 }>
            <label>
              <span>第</span><span className={ css.n }>3</span><span>名</span>
            </label>
            <div className={ css.data }>
              <div className={ css.time }>{ run3rd.timeStr }</div>
              <div className={ css.runner }>{ run3rd.runnersName }</div>
              <div className={ css.date }>{ run3rd.date }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <h3>当前 run</h3>
      <pre>{ run.detailDesc }</pre>

      <h3>第一名</h3>
      <pre>{ run1.detailDesc }</pre>

      <h3>第二名</h3>
      <pre>{ run2.detailDesc }</pre>

      <h3>第三名</h3>
      <pre>{ run3.detailDesc }</pre>
    </div>
  }
}