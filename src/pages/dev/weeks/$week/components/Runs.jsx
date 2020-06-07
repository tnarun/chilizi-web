import React from 'react'
import css from './Runs.scss'

export default class Runs extends React.Component {
  render () {
    let { data, page } = this.props

    // 超过 5 条时
    if (data.length > 5) {
      // 不足 5 条时
      let s = 6 * (page - 1)
      let _runs = data.splice(s, 6).map((x, idx) => {
        return <Run key={ idx} item={ x } />
      })

      let totalpage = Math.ceil(data.length / 6) + 1

      return <>
        <div className={ css.Runs }>
          <div className={ `${css.header} ${css.h1}` }>
            <span>游戏与规则</span>
            <span>最新成绩</span>
            <span>榜单人数</span>
          </div>
          <div className={ css.rs1 }>
            { _runs }
          </div>
        </div>
        <div className={ css.page }>第 <label>{ page } / { totalpage }</label> 页</div>
      </>
    }

    // 不足 5 条时
    let _runs = data.map((x, idx) => {
      return <Run key={ idx} item={ x } />
    })

    return <div className={ css.Runs }>
      <div className={ css.header }>
        <span>游戏与规则</span>
        <span>最新成绩</span>
        <span>榜单人数</span>
      </div>
      <div className={ css.rs }>
        { _runs }
      </div>
    </div>
  }
}

class Run extends React.Component {
  render () {
    let item = this.props.item
    return <div className={ css.Run }>
      <RunInfo item={ item } />

      <div className={ css.infoA }>
        <div className={ css.runnerName }>{ item.run.runnersName }</div>
        <div className={ css.runTime }>
          <a href={ item.devRunLink } target='_blank' rel='noopener noreferrer'>{ item.run.timeStr }</a>
        </div>
        <div className={ css.runDate }>
          <a href={ item.runLink } target='_blank' rel='noopener noreferrer'>{ item.run.date }</a>
        </div>
      </div>

      <div className={ css.infoA }>
        <a className={ css.leaderboardLength } href={ item.leaderboardLink } target='_blank' rel='noopener noreferrer'>{ item.leaderboardLength }</a>
      </div>
    </div>
  }
}

class GameCover extends React.Component {
  render () {
    let { item } = this.props
    let url = item.game.coverHKURLWithParams('?x-oss-process=image/resize,m_fill,h_200,w_200')
    let abbr = item.game.abbr
    return <div className={ css.GameCover }><img src={ url } alt={ abbr } /></div>
  }
}

class RunInfo extends React.Component {
  render () {
    let { item } = this.props
    return <div className={ css.RunInfo }>
      <GameCover item={ item } />
      <div className={ css.nameAndRule }>
        <div className={ css.gName }>{ item.gameName }</div>
        <div className={ css.cDesc }>
          <span>{ item.categoryName }</span>
          {
            item.ValuesDesc ? <>
              <span className={ css.subC }> - </span>
              <span className={ css.subC }>{ item.ValuesDesc }</span>
            </> : <span className={ css.subC }>{ item.ValuesDesc }</span>
          }
        </div>
      </div>
    </div>
  }
}