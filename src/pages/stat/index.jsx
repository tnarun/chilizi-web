import React from 'react'
import css from './stat.scss'

import moment from 'moment'

import { Recharts, Components } from 'react-component-echarts'
import 'echarts'

const { XAxis, YAxis, Series, SplitLine, Title, Label } = Components


const DATA = require('../../tempData/ori2easy.json')
const DATA2 = require('../../tempData/ori2normal.json')
console.log(DATA)
// const TITLE = '马里奥·奥德赛 Any%'
const TITLE = 'ori2 Easy Any%'

export default class stat extends React.Component {
  render () {
    return <div className={ css.stat }>
      <Chart />
      <BestRunner />
      <Gaps />
    </div>
  }
}

class Chart extends React.Component {
  render () {
    let d = DATA.map(x => {
      return [x.submitted, x.time, x.mark]
    })

    let d2 = DATA2.map(x => {
      return [x.submitted, x.time, x.mark]
    })

    return <div className={ css.Chart }>
      <Recharts>
        <Title text={ `${TITLE} 速通时长变化历史，共 ${DATA.length} 个纪录成绩` } /> 
        <YAxis 
          type="value"
          interval={ 600 }
          axisLabel={{
            formatter: (value, idx) => {
              let d = moment.duration(value, 'seconds')
              let h = d.hours()
              let m = d.minutes()
              // let s = d.seconds()
              return h > 0 ? `${h} 小时 ${m} 分` : `${m} 分`
            }
          }}
          max='dataMax'
        />
        <XAxis 
          type="time"
        >
          <SplitLine show={ true } />
        </XAxis>
        <Series 
          data={ d } type="line"
          lineStyle={{ width: 1 }}
          itemStyle={{ color: 'red' }}
          symbol='circle'
          symbolSize='6'
        >
          <Label 
            show={true}
            position='top' 
            formatter={({ value }) => {
              return value[2] || ''
            }}
          />
        </Series>
        <Series 
          data={ d2 } type="line"
          lineStyle={{ width: 1 }}
          itemStyle={{ color: 'red' }}
          symbol='circle'
          symbolSize='6'
        >
          <Label 
            show={true}
            position='top' 
            formatter={({ value }) => {
              return value[2] || ''
            }}
          />
        </Series>
      </Recharts>
    </div>
  }
}

class BestRunner extends React.Component {
  render () {
    let runners = {}
    for (let d of DATA) {
      let runner = d.runner
      if (runners[runner]) {
        runners[runner] += 1
      } else {
        runners[runner] = 1
      }
    }

    let arr = Object.keys(runners).map(runner => {
      return { runner, count: runners[runner] }
    }).sort((a, b) => b.count - a.count)

    let _arr = arr.map((x, idx) => {
      return <div key={idx}>{x.runner}, {x.count} 次  </div>
    })

    return <div className={ css.BestRunner }>
      { _arr }<br/>
      共 { arr.length} 名玩家
    </div>
  }
}

class Gaps extends React.Component {
  render () {
    let gaps = []

    let prev = DATA[0]
    for (let i = 1; i < DATA.length; i++) {
      let d = DATA[i]
      let from = moment(prev.submitted)
      let to = moment(d.submitted)
      let gap = to.diff(from, 'days') + 1
      gaps.push({ from, to, gap })
      prev = d
    }

    gaps = gaps.sort((a, b) => {
      return b.gap - a.gap
    }).slice(0, 10)

    let _gaps = gaps.map((x, idx) => {
      return <div key={idx}>
        { x.from.format('YYYY-MM-DD') } 至 { x.to.format('YYYY-MM-DD') }，{ x.gap } 天  
      </div>
    })

    return <div className={ css.Gaps }>
      { _gaps }
    </div>
  }
}