// title: leaderboard debug

import React from 'react'
import css from './leaderboard-debug.scss'

import leaderboardAPI from '../../api/speedrun/LeaderboardAPI'
import { PlayerStore } from '../../api/speedrun/store'
import { Game, Category } from '../../api/speedrun/components'

class LeaderboardStore {
  constructor ({ game, level, category }) {
    this.params = { game, level, category }
  }

  async load () {
    let { game, level, category } = this.params
    let data = await leaderboardAPI.get({ game, level, category })
    this.data = data.data
  }

  getPlayerById (id) {
    let player = this.data.players.data.filter(p => {
      return p.id === id
    })[0]

    return new PlayerStore({ data: player, css })
  }
}

export default class leaderboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { store: null }
  }

  render () {
    let { store } = this.state

    return <div className={ css.leaderboard }>
      <div className={ css.main }>
        { store ? <>
          <div>
            <a href={ store.data.weblink } target='_blank' rel='noopener noreferrer'>{ store.data.weblink }</a>
          </div><br/>
          <Game store={ store } />
          <Category store={ store } />
          <Runs store={ store } />
        </> : null }
      </div>
    </div>
  }

  async componentDidMount () {
    // let game = '9d3kqg1l'
    // let category = '9kvzy8dg'
    let game = 'bloodborne'
    let category = 'All_Bosses'
    
    let store = new LeaderboardStore({ game, category })
    await store.load()
    this.setState({ store })
  }
}

class Runs extends React.Component {
  render () {
    let { store } = this.props
    let { runs } = store.data

    let _runs = runs.map((x, idx) => {
      let place = x.place
      let d = x.run

      let players = d.players.map(x => store.getPlayerById(x.id))
      let playerNames = players.map(p => p.name)

      return <div className={ css.item } key={ d.id }>
        <span>{ place }</span>
        {/* <span>{ d.id }</span> */}
        <span>{ playerNames }</span>
        <span>{ d.date }</span>
        <span>{ d.times.primary }</span>
      </div>
    })

    return <div className={ css.Runs }>
      <h3>榜单信息</h3>
      <div className={ css.header }>
        <span>名次</span><span>玩家</span><span>日期</span><span>时长</span>
      </div>
      <div className={ css.list }>
        { _runs }
      </div>
    </div>
  }
}