import React from 'react'

export default class  extends React.Component {
  render () {
    let { condition } = this.props

    console.log(condition)

    if (condition) {
      return this.props.children
    }
  
    return <div>loading ...</div>
  }
}