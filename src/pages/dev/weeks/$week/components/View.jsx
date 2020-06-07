import React from 'react'
import css from './View.scss'
import moment from 'moment'

export default class  extends React.Component {
  constructor (props) {
    super(props)
    let weekStr = props.match.params.week
    weekStr = weekStr.replace('w', 'W')
    let from = moment(weekStr).add(-2, 'day').format('YYYY-MM-DD')
    let to = moment(weekStr).add(4, 'day').format('YYYY-MM-DD')

    this.state = {
      weekStr, from, to
    }
  }
  
  render () {
    return <div className={ css.WeekReport }>
      <div className={ css.title }>
        <span>speedrun { this.state.weekStr } { this.state.from } ~ { this.state.to }</span>
      </div>
      <div className={ `${css.view} ${css[`type-${this.props.type}`]}` }>
        <div className={ css.main }>{ this.props.children }</div>
      </div>
    </div>
  }
}