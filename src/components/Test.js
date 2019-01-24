import React, { Component } from 'react';
import styled from 'styled-components'

const title = 'React Dependency Injection'
// 将Injector组件的this.props this.state以参数的形式传入Part组件
const inject = function(Part) {
  return class Injector extends Component {
    render() {
      return (
        <Part
          { ...this.state }
          { ...this.props }
          title={ title }
        />
      )
    }
  }
}

const Title = function({ title }) {
  return <h1>{ title }</h1>
}

var EnhancedTitle = inject(Title);
const Header = function({ title }) {
  return (
    <header>
      <EnhancedTitle />
    </header>
  )
}

export default class extends Component {
  render() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
}