import React from 'react'
import css from './index.scss'

export default class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <div className={ css.main }>
        <h1>吃栗子</h1>
        <p>神秘</p>
      </div>
    </div>
  }
}