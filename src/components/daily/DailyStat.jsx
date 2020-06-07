import React from 'react'
import css from './DailyStat.scss'

export default class Stat extends React.Component {
  render () {
    let store = this.props.store

    let _runs = ['A', 'B', 'C', 'D', 'E', 'Z'].map(x => {
      return <div key={ x }>{x} { store.typeData[x].length }</div>
    })

    return <div className={ css.Stat }>
      <h3>数量统计</h3>
      <div>总纪录数：{ store.data.length }</div>
      { _runs }
    </div>
  }

  state = {
    days: {}
  }
}