import React from 'react'
import css from './Levels.scss'
import classNames from 'classnames/bind'

const descs = {
  A: <>A 级榜单：人数在 <label>300</label> 人以上，顶级热门</>,
  B: <>B 级榜单：人数在 <label>100 ~ 299</label> 人之间，非常热门</>,
  C: <>C 级榜单：人数在 <label>30 ~ 99</label> 人之间，热度还行</>,
  D: <>D 级榜单：人数在 <label>10 ~ 29</label> 人之间，热度一般</>,
  E: <>E 级榜单：人数在 <label>2 ~ 9</label> 人之间，比较冷门</>,
  Z: <>Z 级榜单：只有 <label>1</label> 个人提交成绩，第一个吃螃蟹</>,
}

export default class Levels extends React.Component {
  render () {
    let level = this.props.level

    let cA = classNames.bind(css)({
      A: true, active: level === 'A'
    })

    let cB = classNames.bind(css)({
      B: true, active: level === 'B'
    })

    let cC = classNames.bind(css)({
      C: true, active: level === 'C'
    })

    let cD = classNames.bind(css)({
      D: true, active: level === 'D'
    })

    let cE = classNames.bind(css)({
      E: true, active: level === 'E'
    })

    let cZ = classNames.bind(css)({
      Z: true, active: level === 'Z'
    })

    return <div className={ css.layout }>
      <div className={ css.Levels }>
        <label className={ cA } onClick={ evt => this.click('A') }><span>A</span></label>
        <label className={ cB } onClick={ evt => this.click('B') }><span>B</span></label>
        <label className={ cC } onClick={ evt => this.click('C') }><span>C</span></label>
        <label className={ cD } onClick={ evt => this.click('D') }><span>D</span></label>
        <label className={ cE } onClick={ evt => this.click('E') }><span>E</span></label>
        <label className={ cZ } onClick={ evt => this.click('Z') }><span>Z</span></label>
      </div>

      <div className={ css.LevelDesc }>
        <div className={ css.desc }>
          <div className={ css.inner }>
            <span>{ descs[level] }</span>
          </div>
          <div className={ css.inner }>
            <span><label>{ this.props.weekStr }</label> 本周成绩数量： <label className={ css.n }>{ this.state.count }</label></span>
          </div>
        </div>

        <div className={ css.main }>
          { this.props.children }
        </div>
      </div>
    </div>
  }

  state = {
    count: ''
  }

  click (level) {
    let href = window.location.href
    href = href.split('/')
    href[href.length - 1] = level
    window.location.href = href.join('/')
  }

  componentDidMount () {
    window.setLBCount = (count) => {
      this.setState({ count })
    }
  }
}