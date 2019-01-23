import React, { Component } from 'react';
import styled from 'styled-components'

import api from '../api'

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li{
    padding: 20px;
  }
`
const LayoutBox = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  display: flex;
  height: 100%;
`
const LayoutAside = styled.div`
  overflow-y: auto;
  width: 110px;
`
const LayoutMain = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fff;
`

class Cate extends Component {

  state = {
    cates: [],
    products: []
  }

  componentDidMount() {
    api.getProductCateList('2')
      .then((res) => {
        const { data } = res
        this.setState({cates: data})
        return data[0]
      })
      .catch((err) => {
      })
      .then((res) => {
        api.getProductByCate('2', res.id)
          .then((res) => {
            const { data } = res
            this.setState({products: data})
          })
      })


  }

  render() {
    const { cates, products } = this.state
    return (
      <LayoutBox>
        <LayoutAside>
          <StyledUl>
            {cates.map((item) => <li key={item.id}>{item.name}</li>)}
          </StyledUl>
        </LayoutAside>
        <LayoutMain>
          <StyledUl>
            {products.map((item) => <li key={item.skuid}>{item.name}</li>)}
          </StyledUl>
        </LayoutMain>
      </LayoutBox>
    )
  }
}

export default Cate