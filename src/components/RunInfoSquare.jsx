import React from 'react'
import css from './RunInfoSquare.scss'

import encn from './encn'

export default class extends React.Component {
  render () {
    let store = this.props.store

    let run1st = store.leaderboard.getRunDataByIndex(0)
    let run2nd = store.leaderboard.getRunDataByIndex(1)
    let run3rd = store.leaderboard.getRunDataByIndex(2)

    return <div className={ css.RunInfo }>
      <div className={ css.cover }>
        <div className={ css.img } style={{ 
          backgroundImage: `url(${ store.game.coverHKURL })`
        }}></div>
      </div>

      <div className={ css.detail }>
        <div className={ css.base }>
          <Names store={ store } />
          <Category store={ store } />
          <Total store={ store } />
        </div>
        <div className={ css.board }>
          <MingCi data={ run1st } label='1ST' />
          <MingCi data={ run2nd } label='2ND' />
          <MingCi data={ run3rd } label='3RD' />
        </div>
      </div>
    </div>
  }
}

class Names extends React.Component {
  render () {
    let store = this.props.store

    return <div className={ css.Names }>
      <div className={ css.cnName }>{ encn(store.game.abbreviation) }</div>
      <div className={ css.enName }>{ store.game.name }</div>
    </div>
  }
}

class Category extends React.Component {
  render () {
    let store = this.props.store

    return <div className={ css.Category }>
      { store.run.fullCategoryDesc }
    </div>
  }
}

class Total extends React.Component {
  render () {
    let store = this.props.store

    return <div className={ css.Total }>
      <label>榜单总人数</label>
      <span>{ store.leaderboard.runs.length }</span>
    </div>
  }
}

class MingCi extends React.Component {
  render () {
    let data = this.props.data
    if (!data) {
      return null
    }

    // let s = data.date.split('-')
    // let year = s[0]
    // let day = `${s[1]}-${s[2]}`

    return <div className={ css.MingCi }>
      <label>{ this.props.label }</label>
      <div className={ css.data }>
        <span className={ css.time }>{ data.timeStr }</span>
        <span className={ css.runner }>{ data.runnersName }</span>
        <span className={ css.date }>
          { data.date }
        </span>
      </div>
    </div>
  }
}