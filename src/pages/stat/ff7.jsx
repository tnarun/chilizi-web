import React from 'react'
import css from './ff7.scss'

import treeData from '../../tempData/ff7/tree.json'
import leaderboardsData from '../../tempData/ff7/leaderboards.json'

import SpeedrunUtils from "speedrun-utils"
const { time } = SpeedrunUtils

export default class ff7 extends React.Component {
  render () {
    let _categories = treeData.map((x, idx) => {
      return <Category data={ x } key={ idx } />
    })

    return <div className={ css.ff7 }>
      <div className={ css.cs }>
        { _categories }
      </div>
    </div>
  }
}

class Category extends React.Component {
  render () {
    let { id, name, subs } = this.props.data
    let values = subs[0].values

    let _subs = Object.keys(values).map((key, idx) => {
      let value = values[key]
      return <Leaderboard key={ key } value={ value } cidx={ idx } categoryId={ id } />
    })

    return <div className={ css.Category }>
      <div className={ css.name }>{ name }</div>
      <div className={ css.subs }>
        { _subs }
      </div>
    </div>
  }
}

class Leaderboard extends React.Component {
  render () {
    let { value, categoryId, cidx } = this.props
    let ldata = leaderboardsData.filter(d => {
      return d.data.category === categoryId
    })[cidx]

    let run = ldata.data.runs[0].run
    let player = ldata.data.players.data[0]

    return <div className={ css.Leaderboard }>
      <div className={ css.vname }>{ value }</div>
      <div className={ css.ld }>
        { player.names.international }
      </div>
      <div className={ css.time }>
        { time.playTimeStr(run.times.primary) }
      </div>
    </div>
  }
}