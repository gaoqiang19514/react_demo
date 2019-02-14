import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

const styled = {
  width: 100,
  height: 100,
  background: 'red'
}

const Transition = () => (
  <Motion
    defaultStyle={{ fontSize: 14 }}
    style={{ fontSize: spring(24) }}
  >
    {interpolatingStyle => {
      return <h1 style={interpolatingStyle}>Hello React</h1>
    }}
  </Motion>
)


export default class extends Component {

  render() {
    return (
      <div>
        Rmotion
        <Transition />
      </div>
    )
  }
}