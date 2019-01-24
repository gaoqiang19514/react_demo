import React, { Component } from 'react'
import { Link, Route } from "react-router-dom"
import styled from 'styled-components'

const Modal = () => {
  const fixedStyle = {

  }
  return (
    <div style={fixedStyle}>
      Modal
    </div>
  )
}

class Product extends Component {

  render() {
    return (
      <div>
        <Link to='/product/layer'>layer</Link>
        <Route path="/product/layer" component={Modal} />
      </div>
    )
  }
}

export default Product