import React from 'react'
import { NavLink } from "react-router-dom"
import styled from 'styled-components'

const S_Link = styled(NavLink)`
  font-size: 16px;
`

export default () => (
  <nav>
    <S_Link to="/">Public</S_Link>
    <S_Link to="/protected">Protected</S_Link>
    <S_Link to="/transition">transition</S_Link>
    <S_Link to="/order">order</S_Link>
  </nav>
)