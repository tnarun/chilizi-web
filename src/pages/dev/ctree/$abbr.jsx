import React from 'react'
import css from './$abbr.scss'

import su from 'speedrun-utils'

const { apiGet } = su
const { LeaderboardData } = su.data
const { Game } = su.query

export default class extends React.Component {
  constructor (props) {
    super(props)
    let abbr = this.props.match.params.abbr

    this.state = {
      abbr,
      ctree: null
    }
  }

  render () {
    return <div className={ css.ctree }>
      <div className={ css.main }>
        <div>
          <a href={ `https://www.speedrun.com/${ this.state.abbr }` } target='_blank' rel='noopener noreferrer'>{ this.state.abbr }</a>
        </div>
        {
          this.state.ctree ? <div>
            <CoverAndCategories abbr={ this.state.abbr } ctree={ this.state.ctree } />
            <Categories ctree={ this.state.ctree } />
            <CategoriesTree ctree={ this.state.ctree } />
            <LeaderboardsList clist={ this.state.clist } />
          </div> : <div>loading ...</div>
        }
      </div>
    </div>
  }

  async componentDidMount () {
    let ctree = await Game.getCategoriesWithSubCategoriesByAbbr(this.state.abbr)
    let clist = Game.packCategoriesTreeToList({ categoriesTree: ctree })
    this.setState({ ctree, clist })

    window.document.title = `榜单分类：${ this.state.abbr }`
  }
}

class CoverAndCategories extends React.Component {
  render () {
    let { ctree, abbr } = this.props
    let src = `//speedrun-covers.oss-cn-hongkong.aliyuncs.com/themes/${abbr}/cover-256.png`
    return <div className={ css.CoverAndCategories }>
      <div>
        <div className={ css.cover }>
          <img src={ src } alt={ abbr } />
        </div>
      </div>
      <div className={ css.categories }>
        {
          ctree.map(c => {
            return <div className={ css.c } key={ c.id }>
              { c.name }
            </div>
          })
        }
      </div>
    </div>
  }
}

class Categories extends React.Component {
  render () {
    let { ctree } = this.props
    let _cs = ctree.map(c => {
      return <div className={ css.c } key={ c.id }>
        { c.name }
      </div>
    })

    return <div className={ css.Categories }>
      <h3>主分类</h3>
      { _cs }
    </div>
  }
}

class CategoriesTree extends React.Component {
  render () {
    let { ctree } = this.props

    let _cs = ctree.map(c => {
      let subs = c.subCategories.map(sc => {
        let valueLabels = sc.valueLabels
        let labels = Object.keys(valueLabels).map(key => {
          return <div className={ css.label } key={ key }>
            { valueLabels[key] }
          </div>
        })

        return <div className={ css.sc } key={ sc.id }>
          <div className={ css.sname }>{ sc.name }</div>
          <div className={ css.labels }>
            { labels }
          </div>
        </div>
      })

      return <div className={ css.c } key={ c.id }>
        <div className={ css.name }>{ c.name }</div>
        <div className={ css.subs }>
          { subs }
        </div> 
      </div>
    })

    return <div className={ css.CategoriesTree }>
      <h3>分类树</h3>
      { _cs }
    </div>
  }
}

class LeaderboardsList extends React.Component {
  render () {
    let { clist } = this.props

    let num = 0
    let _cs = clist.map(c => {
      let _clist = c.list.map((item, idx) => {
        let _options = item.options.map((o, idy) => <LeaderboardOption 
          option={ o } idy={ idy } key={ idy } />)
        num += 1
        return <div className={ css.leaderboard } key={ idx }>
          <span className={ css.num }>{ num }. </span>
          <span>{ _options }</span>
          <WorldRecord item={ item } />
        </div>
      })
      
      return <div className={ css.c } key={ c.id }>
        <div className={ css.name }>{ c.name }</div>
        <SubCategoriesNames category={ c } />
        <div className={ css.leaderboards }>
          { _clist }
        </div>
      </div>
    })

    return <div className={ css.LeaderboardsList }>
      <h3>分类清单</h3>
      <div>
        { _cs }
      </div>
    </div>
  }
}

class SubCategoriesNames extends React.Component {
  render () {
    let { category } = this.props
    return <div className={ css.SubCategoriesNames }>
      {
        category.subCategoryNames.map((scName, idx) => {
          return <span key={ idx }>
            { idx > 0 ? <span className={ css.slash }> / </span> : null }
            <span>{ scName }</span>
          </span>
        })
      }
    </div>
  }
}

class LeaderboardOption extends React.Component {
  render () {
    let { option, idy } = this.props
    return <>
      { idy > 0 ? <span className={ css.slash }> / </span> : null }
      <span>
        <span>{ option.label }</span>
      </span>
    </>
  }
}

class WorldRecord extends React.Component {
  render () {
    let { runData } = this.state

    if (!runData) {
      return null
    }

    return <span className={ css.WorldRecord }>
      { runData ? <>
        <span className={ css.pname }>{ runData.runnersName }</span>
        <span className={ css.time }>{ runData.timeStr }</span>
        <span className={ css.date }>{ runData.date }</span>
      </> : null }
    </span>
  }

  state = {
    runData: null
  }

  async componentDidMount (){
    let { item } = this.props
    let path = `/leaderboards/${item.gameId}/category/${item.categoryId}?embed=players&top=1&${item.queryStr}`
    let data = await apiGet({ path })
    let lData = new LeaderboardData(data.data)

    if (lData.runs.length === 0) {
      return
    }

    let runData = lData.runs[0].runData
    this.setState({ runData })
    console.log(runData)
    // console.log(path)
  }
}