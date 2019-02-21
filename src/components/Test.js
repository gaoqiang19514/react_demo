import React, { Component } from 'react'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = { name: '' }

    setTimeout(() => {
      console.log('setState before')
      this.setState({ name: 'tom' }, () => {
        console.log('setState after')
      })
    }, 2000)
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate this.state.name', this.state.name)
    console.log('componentWillUpdate nextState.name', nextState.name)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate prevState.name', prevState.name)
    console.log('componentDidUpdate this.state.name', this.state.name)
  }
  
  render() {
    console.log('render', this.state.name)
    return (
      <div>
        Test
      </div>
    )
  }
}