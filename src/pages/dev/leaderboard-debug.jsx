import React from 'react'
import css from './leaderboard.scss'

import leaderboardAPI from '../../api/speedrun/LeaderboardAPI'

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

    return new PlayerStore({ data: player })
  }
}

class PlayerStore {
  constructor ({ data }) {
    this.data = data
  }

  get name () {
    try {
      return this.data.names.international
    } catch (e) {
      return <span className={ css.guest }>guest</span>
    }
  }
}

class GameStore {
  constructor ({ data }) {
    this.data = data
  }

  get name () {
    return this.data.names.international
  }

  get abbreviation () {
    return this.data.abbreviation
  }
}

class CategoryStore {
  constructor ({ data }) {
    this.data = data
  }

  get name () {
    return this.data.name
  }

  get type () {
    return this.data.type
  }

  get rules () {
    return this.data.rules
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

class Game extends React.Component {
  render () {
    let { store } = this.props
    let { game } = store.data

    if (typeof(game) === 'string') {
      return <div>Game: { game }</div>
    }

    let st = new GameStore({ data: game.data })

    return <div className={ css.Game }>
      <h3>游戏信息</h3>
      <div className={ css.header }>
        <span>属性</span><span>值</span>
      </div>
      <div className={ css.list }>
        <div className={ css.item }>
          <span>name</span><span>{ st.name }</span>
        </div>
        <div className={ css.item}>
          <span>abbreviation</span><span>{ st.abbreviation }</span>
        </div>
      </div>
    </div>
  }
}

class Category extends React.Component {
  render () {
    let { store } = this.props
    let { category } = store.data

    if (typeof(category) === 'string') {
      return <div>Category: { category }</div>
    }

    let st = new CategoryStore({ data: category.data })

    return <div className={ css.Category }>
      <h3>规则信息</h3>
      <div className={ css.header }>
        <span>属性</span><span>值</span>
      </div>
      <div className={ css.list }>
        <div className={ css.item }>
          <span>name</span><span>{ st.name }</span>
        </div>
        <div className={ css.item}>
          <span>type</span><span>{ st.type }</span>
        </div>
        <div className={ css.item }>
          <span>rules</span><span><pre className={ css.text }>{ st.rules }</pre></span>
        </div>
      </div>
    </div>
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