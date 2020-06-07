import React from 'react'
import css from './RunBrief.scss'

import SpeedrunUtils from "speedrun-utils"
const { query } = SpeedrunUtils
const { Run } = query

export default class Brief extends React.Component {
  render () {
    let store = this.props.store
    let game = store.game

    let run1st = store.leaderboard.getRunDataByIndex(0)
    let run2nd = store.leaderboard.getRunDataByIndex(1)
    let run3rd = store.leaderboard.getRunDataByIndex(2)

    let { prev } = this.state

    return <div className={ css.RunBrief }>
      <div className={ css.cover }>
        <img src={ game.coverHKURL } alt={ game.abbr } />
      </div>

      <div className={ css.infos }>        
        <div className={ css.info }>
          <span className={ css.name }>{ game.cnORenName }</span>
          <span className={ css.category }>
            <span>{ store.run.categoryName }</span>
            {
              store.run.subCategorieNames ? <>
                <span className={ css.subC }> - </span>
                <span className={ css.subC }>{ store.run.subCategorieNames }</span>
              </> : null
            }
          </span>
        </div>
        <div className={ css.total }>
          <label>榜单人数</label>
          <span>{ store.leaderboard.runs.length }</span>
        </div>

        <div className={ css.first }>
          <label>最新纪录</label>
          <RunDiv run={ run1st } />
        </div>

        {
          prev ? <div className={ css.prev }>
            <label>上个纪录</label>
            <RunDiv run={ prev } />
          </div> : <span></span>
        }

        {
          prev ? <div className={ css.quickthan }>
            <label>时间缩短</label>
            <span className={ css.short }>{ run1st.timeDiffStr(prev) }</span>
          </div> : <span></span>
        }

        {
          run2nd ? <div className={ css.second }>
            <label>　第二名</label>
            <RunDiv run={ run2nd } />
          </div> : null
        }

        {
          run3rd ? <div className={ css.second }>
            <label>　第三名</label>
            <RunDiv run={ run3rd } />
          </div> : null
        }
      </div>
    </div>
  }

  state = {
    prev: null
  }

  async componentDidMount () {
    let runId = this.props.store.leaderboard.getRunDataByIndex(0).id
    // console.log({ runId })
    let res = await Run.getNewestTwoRecords(runId)
    this.setState({ prev: res.prev })
  }
}

class RunDiv extends React.Component {
  render () {
    let { run } = this.props
    return <div className={ css.rundiv }>
      <span className={ css.time }>{ run.timeStr }</span>
      <span> by </span>
      <span className={ css.runner }>{ run.runnersName }</span>
      <span> on </span>
      <span className={ css.date }>{ run.date }</span>
    </div>
  }
}