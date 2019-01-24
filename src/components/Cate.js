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

const Product = ({name, imagePath, price, state}) => {
  const flex = {
    display: 'flex'
  }
  const flexAlignCenter = {
    ...flex,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
  const flexShrink = {
    flex: 1
  }
  const nameStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  }
  const priceStyle = {
    fontSize: 14,
    color: '#F53415',
    fontWeight: 'bold'
  }
  const stateStyle = {
    fontSize: 12,
    padding: '2px 8px',
    borderRadius: 3,
    color: '#7e7e7e7e',
    background: '#F2F2F2'
  }
  const redStateStyle = {
    ...stateStyle,
    color: '#fff',
    background: '#F63618'
  }

  return <li style={{padding: 10}}>
    <div style={flex}>
      <img style={{width: 90, height: 90}} src={imagePath} alt={name}/>
      <div style={flexShrink}>
        <div style={nameStyle}>{name}</div>
        <div style={priceStyle}>￥{price}</div>
        <div style={flexAlignCenter}>
          <span style={stateStyle}>{state ? '有货' : '无货'}</span>
          {state ? <span style={redStateStyle}>兑换</span> : ''}
        </div>
      </div>
    </div>
  </li>
}

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
            {products.map((item) => <Product key={item.skuid} price={item.price} state={item.state} imagePath={item.imagePath} name={item.name}/>)}
          </StyledUl>
        </LayoutMain>
      </LayoutBox>
    )
  }
}

export default Cate