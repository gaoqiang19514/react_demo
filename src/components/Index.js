import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom"

import kafei from '../asset/images/icon/kafei.png'

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
`
const StyledLink = styled(Link)`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  img{
    display: block;
    width: 25px;
    height: 25px;
    margin: 0 auto 5px;
  }
  .wrap{
    margin: 5px;
    padding: 5px 0;
    border-radius: 3px; 
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }
`

const Item = ({to, icon, text}) => (
  <StyledLink to={to}>
    <div className="wrap">
      <img src={icon} alt=""/>
      <div>{text}</div>
    </div>
  </StyledLink>
)

export default class extends Component {

  render() {
    return (
      <div>
        
        <section>
          <h2 className="u_fStyledxxx u_f_bold u_m_xxx">常用服务</h2>
          <div className="u_mx_xx">
            <StyledNav>
              <Item to="/double_color_ball" icon={kafei} text="双色球"/>
            </StyledNav>
          </div>
        </section>
      </div>
    )
  }
}