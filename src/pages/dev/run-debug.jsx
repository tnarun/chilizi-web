// title: run debug

import React from 'react'
import css from './run-debug.scss'

import RunAPI from '../../api/speedrun/RunAPI'
import { PlayerStore } from '../../api/speedrun/store'
import { Game, Category } from '../../api/speedrun/components'

class RunStore {
  constructor ({ id }) {
    this.params = { id }
  }

  async load () {
    let { id } = this.params
    let data = await RunAPI.get({ id })
    this.data = data.data
  }
}

export default class run extends React.Component {
  constructor (props) {
    super(props)
    this.state = { store: null }
  }

  render () {
    let { store } = this.state

    return <div className={ css.run }>
      <div className={ css.main }>
        { store ? <>
          <div>
            <a href={ store.data.weblink } target='_blank' rel='noopener noreferrer'>{ store.data.weblink }</a>
          </div><br/>
          <Player store={ store } />
          <Game store={ store } />
          <Category store={ store } />
        </> : null }
      </div>
    </div>
  }

  async componentDidMount () {
    let id = 'y21w397z'
    
    let store = new RunStore({ id })
    await store.load()
    this.setState({ store })
  }
}

class Player extends React.Component {
  render () {
    let { data } = this.props.store
    let players = data.players.data
    let _players = players.map((p, idx) => {
      let dp = new PlayerStore({ data: p, css })
      return <div className={ css.list } key={ idx }>
        <div className={ css.item }>
          <span>name</span><span>{ dp.name }</span>
        </div>
      </div>
    })
    
    return <div className={ css.Player }>
      <h3>玩家信息</h3>
      <div className={ css.header }>
        <span>属性</span><span>值</span>
      </div>
      { _players }
    </div>
  }
}