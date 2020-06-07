import React from 'react'
import css from './DailyRuns.scss'

const lbDesc = {
  A: '300 人以上的特大榜单，无论何时，都代表最热门的经典速通',
  B: '100 ~ 299 人的榜单，代表非常热门的速通',
  C: '30 ~ 99 人的榜单，是热度还不错的速通',
  D: '10 ~ 29 人的榜单，是热度一般的速通',
  E: '10 人以下的榜单，算是冷门速通吧',
  Z: '只有 1 人，独一无二的榜单，是第一个吃螃蟹的人',
}

export default class DailyRuns extends React.Component {
  render () {
    let data = this.props.store.typeData[this.props.type]

    let _runs = data.map(item => {
      return <div className={ css.item } key={ item.runId }>
        <div className={ css.info }>
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
    })

    let fromTo = `${ this.props.store.from } - ${ this.props.store.to }`
    
    return <div className={ css.DailyRuns }>
      <h3>{ this.props.type } 级榜单</h3>
      <div className={ css.ldesc }>{ lbDesc[this.props.type] }</div>
      <div className={ css.newNum }>本期 ( { fromTo } ) 共有 { data.length } 个新纪录</div>
      <div className={ css.list }>
        <div className={ css.header }>
          <span>游戏与规则</span>
          <span>最新成绩</span>
          <span>榜单人数</span>
        </div>
        <div className={ css.runs }>
          { _runs }
        </div>
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