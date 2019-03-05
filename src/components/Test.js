import React, { Component } from 'react'
import uuid from 'uuid'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
const Random = require('mockjs').Random

const StyledItem = styled.div`
  margin: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  background: #fff;
`

export default class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {show: false, items: [
      {id: uuid(), title: Random.paragraph(1, 2)},
      {id: uuid(), title: Random.paragraph(1, 2)},
      {id: uuid(), title: Random.paragraph(1, 2)},
      {id: uuid(), title: Random.paragraph(1, 2)},
      {id: uuid(), title: Random.paragraph(1, 2)},
      {id: uuid(), title: Random.paragraph(1, 2)},
      {id: uuid(), title: Random.paragraph(1, 2)}
    ]}

    this.toggle = this.toggle.bind(this)
    this.removeById = this.removeById.bind(this)
  }

  toggle() {
    this.setState({show: !this.state.show})
  }

  removeById(id) {
    const items = this.state.items.filter(item => item.id !== id)
    this.setState({items: items})
  }

  render() {
    const {items} = this.state
    return (
      <TransitionGroup>
        {items.map(item => {
          return <CSSTransition key={item.id} timeout={500} classNames="fade">
            <StyledItem className="item" id={item.id}>{item.title}<button onClick={() => this.removeById(item.id)}>删除</button></StyledItem>
          </CSSTransition>
        })}
      </TransitionGroup>
    )
  }
}