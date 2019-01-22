import React, { Component } from 'react';
import styled from 'styled-components'

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li{
    padding: 20px;
  }
`
const LayoutBox = styled.div`
  display: flex;
  height: 100%;
`
const LayoutAside = styled.div`
    overflow-y: auto;
`
const LayoutMain = styled.div`
    overflow-y: auto;
  flex: 1;
  background: #fff;
`

class Cate extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <LayoutBox>
        <LayoutAside>
          <StyledUl>
            <li>居家</li>
            <li>布艺软装</li>
            <li>被枕</li>
            <li>床品件套</li>
            <li>灯具</li>
            <li>收纳</li>
            <li>家饰</li>
            <li>家具</li>
            <li>宠物</li>
            <li>居家</li>
            <li>布艺软装</li>
            <li>被枕</li>
            <li>床品件套</li>
            <li>灯具</li>
            <li>收纳</li>
            <li>家饰</li>
            <li>家具</li>
            <li>宠物</li>
          </StyledUl>
        </LayoutAside>
        <LayoutMain>
          <StyledUl>
            <li>居家</li>
            <li>布艺软装</li>
            <li>被枕</li>
            <li>床品件套</li>
            <li>灯具</li>
            <li>收纳</li>
            <li>家饰</li>
            <li>家具</li>
            <li>宠物</li>
            <li>居家</li>
            <li>布艺软装</li>
            <li>被枕</li>
            <li>床品件套</li>
            <li>灯具</li>
            <li>收纳</li>
            <li>家饰</li>
            <li>家具</li>
            <li>宠物</li>
          </StyledUl>
        </LayoutMain>
      </LayoutBox>
    )
  }
}

export default Cate