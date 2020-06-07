import React from 'react'
import css from './index.scss'

export default class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <div className={ css.main }>
        <h1>吃栗子</h1>
        <p>神秘</p>

        <QueryCTree />
        <a href='/dev/calendar'>日历</a>
      </div>
    </div>
  }
}

class QueryCTree extends React.Component {
  render () {
    return <div className={ css.QueryCTree }>
      <h3>规则树</h3>
      <input value={ this.state.abbr } onChange={ evt => this.setState({ abbr: evt.target.value })} /> <button onClick={ evt => this.query() }>GO</button>
    </div>
  }

  state = {
    abbr: ''
  }

  query () {
    let abbr = this.state.abbr
    window.location.href = `/dev/ctree/${ abbr }`
  }
}