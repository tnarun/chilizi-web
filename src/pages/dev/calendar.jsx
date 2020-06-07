import React from 'react'
import css from './calendar.scss'

import moment from 'moment'
import classNames from 'classnames/bind'
import LoadingBox from '../../components/LoadingBox'
import fetchJSON from '../../api/fetchJSON'

export default class index extends React.Component {
  render () {
    let { dateIndex } = this.state

    return <div className={ css.index }>
      <LoadingBox condition={ !!dateIndex } >
        <Weeks dateIndex={ dateIndex } />
      </LoadingBox>
    </div>
  }

  state = {
    dateIndex: null
  }

  async componentDidMount () {
    let data = await fetchJSON(`//tna-upload.oss-cn-shanghai.aliyuncs.com/speedrun-weekly-leaderboard-runs-data/file-names-index.json?${Math.random()}`)
    this.setState({ dateIndex: data })
  }
}

class Weeks extends React.Component {
  render () {
    let { dateIndex } = this.props

    let _weeks = new Array(50).fill(0).map((x, w) => {
      let _w = w + 1
      let week = _w >= 10 ? _w : `0${_w}`
      let d = moment(`2020W${week}`)
      let dates = []
      for (let i = 0; i <= 6; i++) {
        dates.push(d.clone().add(i, 'day'))
      }

      let _dates = dates.map((x, idx) => {
        let exist = dateIndex.includes(x.format('YYYY-MM-DD'))
        return <Day day={ x } key={ idx } exist={ exist } />
      })

      let from = moment(`2020W${week}`).add(-2, 'day').format('YYYY-MM-DD')
      let to = moment(`2020W${week}`).add(4, 'day').format('YYYY-MM-DD')
      let weekLink = `/dev/daily/fromto?from=${from}&to=${to}`

      return <div className={ css.week } key={ week }>
        <a href={weekLink}>W{week}</a>
        { _dates }
      </div>
    })

    return <div className={ css.weeks }>
      <div className={ css.header }>
        <span></span>
        <span>周一</span>
        <span>周二</span>
        <span>周三</span>
        <span>周四</span>
        <span>周五</span>
        <span>周六</span>
        <span>周日</span>
      </div>
      { _weeks }
    </div>
  }
}

class Day extends React.Component {
  render () {
    let today = moment()
    let day = this.props.day
    let dStr = day.format('YYYY-MM-DD')
    let isToday = today.format('YYYY-MM-DD') === dStr

    let className = classNames.bind(css)({
      Day: true,
      today: isToday,
      past: !isToday && day < today,
      future: !isToday && day > today,
      exist: this.props.exist
    })

    return <a href={ `/dev/daily/${ dStr }` } className={ className }
      target='_blank' rel='noopener noreferrer'
    >
      { dStr }
    </a>
  }
}