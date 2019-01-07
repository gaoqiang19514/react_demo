import React from 'react'
import { NavLink } from "react-router-dom"

export default () => (
  <nav>
    <NavLink to="/">Public Page</NavLink>
    <NavLink to="/protected">Protected Page</NavLink>
    <NavLink to="/order">order Page</NavLink>
  </nav>
)