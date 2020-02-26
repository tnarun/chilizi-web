import React from 'react'
import css from './components.scss'

import { GameStore, CategoryStore } from '../../api/speedrun/store'

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

export { Game, Category }