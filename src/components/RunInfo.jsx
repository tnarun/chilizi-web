import React from 'react'
import css from './RunInfo.scss'

import encn from './encn'

export default class extends React.Component {
  render () {
    let store = this.props.store

    let run1st = store.leaderboard.getRunDataByIndex(0)
    let run2nd = store.leaderboard.getRunDataByIndex(1)
    let run3rd = store.leaderboard.getRunDataByIndex(2)

    return <div className={ css.RunInfo }>
      <div className={ css.cover }>
        <img src={ store.game.coverHKURL } alt='cover' />
      </div>

      <div className={ css.infos }>        
        <div className={ css.info }>
          <span className={ css.name }>{ encn(store.game.abbreviation) } - { store.game.name }</span>
          <span className={ css.category }>{ store.run.fullCategoryDesc }</span>
        </div>
        <div className={ css.total }>
          <span>榜单总人数: { store.leaderboard.runs.length }</span>
        </div>
        <div className={ css.mingci }>
          <div className={ css.m1 }>
            <label>
              <span>第</span><span className={ css.n }>1</span><span>名</span>
            </label>
            <div className={ css.data }>
              <div className={ css.time }>{ run1st.timeStr }</div>
              <div className={ css.runner }>{ run1st.runnersName }</div>
              <div className={ css.date }>{ run1st.date }</div>
            </div>
          </div>
          {
            run2nd ?
              <div className={ css.m2 }>
                <label>
                  <span>第</span><span className={ css.n }>2</span><span>名</span>
                </label>
                <div className={ css.data }>
                  <div className={ css.time }>{ run2nd.timeStr }</div>
                  <div className={ css.runner }>{ run2nd.runnersName }</div>
                  <div className={ css.date }>{ run2nd.date }</div>
                </div>
              </div> : null
          }
          {
            run3rd ?
              <div className={ css.m3 }>
                <label>
                  <span>第</span><span className={ css.n }>3</span><span>名</span>
                </label>
                <div className={ css.data }>
                  <div className={ css.time }>{ run3rd.timeStr }</div>
                  <div className={ css.runner }>{ run3rd.runnersName }</div>
                  <div className={ css.date }>{ run3rd.date }</div>
                </div>
              </div> : null
          }
        </div>
      </div>
    </div>
  }
}