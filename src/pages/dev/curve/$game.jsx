import React from 'react'
import css from './$game.scss'

import { observable, configure, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames/bind'

const ENDPOINT = require('../../../api/speedrun/endpoint').ENDPOINT

configure({ enforceActions: "always" })

class GameStore {
  constructor ({ abbr }) {
    this.abbr = abbr
  }

  @observable currentCategoryId = null

  @action
  setCurrentCategoryId (categoryId) {
    this.currentCategoryId = categoryId
  }

  async load () {
    let url = `${ENDPOINT}/games/${this.abbr}?embed=categories,variables`

    let res = await fetch(url)
    let data = await res.json()

    this.data = data.data
    // console.log(this.data.categories)
  }

  get categories () {
    return this.data.categories.data.sort((a, b) => a.miscellaneous - b.miscellaneous)
  }

  get variables () {
    return this.data.variables.data
  }

  @computed
  get currentVariables () {
    return this.variables.filter(x => x.category === this.currentCategoryId)
  }
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    let abbr = this.props.match.params.game
    let store = new GameStore({ abbr })
    this.store = store

    this.state = {
      loaded: false
    }
  }

  render () {
    return <div className={ css.Game }>
      {
        this.state.loaded ? <>
          <CategoriesTab store={ this.store } />
          <div className={ css.main }>
            <Variables store={ this.store } />
          </div>
        </> : null
      }
    </div>
  }

  async componentDidMount () {
    await this.store.load()
    this.setState({ loaded: true })
  }
}

@observer
class CategoriesTab extends React.Component {
  render () {
    let store = this.props.store
    let _categories = store.categories.map((x, idx) => {
      let className = classNames.bind(css)({
        tab: true,
        selected: x.id === store.currentCategoryId
      })
      return <span className={ className } onClick={ evt => this.choose(x.id) } key={ idx }>{ x.name }</span>
    })

    return <div className={ css.CategoriesTab }>
      { _categories }
    </div>
  }

  choose (categoryId) {
    this.props.store.setCurrentCategoryId(categoryId)
  }
}

@observer
class Variables extends React.Component {
  render () {
    let _variables = this.props.store.currentVariables.map((x, idx) => {
      let _values = Object.values(x.values.values).map(v => {
        return <span key={ v.label }>{ v.label }</span>
      })

      return <div key={ idx } className={ css.var }>
        { _values }
      </div>
    })

    return <div className={ css.Variables }>
      { _variables }
    </div>
  }
}