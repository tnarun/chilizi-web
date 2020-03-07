import React from 'react'
import css from './index.scss'

export default class index extends React.Component {
  render () {
    return <div className={ css.index }>
      <h3>2020-02-24 至 2020-03-01</h3>
      <div className={ css.links }>
        <a href='/dev/daily/2020-02-24'>2020-02-24</a>
        <a href='/dev/daily/2020-02-25'>2020-02-25</a>
        <a href='/dev/daily/2020-02-26'>2020-02-26</a>
        <a href='/dev/daily/2020-02-27'>2020-02-27</a>
        <a href='/dev/daily/2020-02-28'>2020-02-28</a>
        <a href='/dev/daily/2020-02-29'>2020-02-29</a>
        <a href='/dev/daily/2020-03-01'>2020-03-01</a>
      </div>
    </div>
  }
}