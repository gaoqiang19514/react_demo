import React, { Component } from 'react';
import styled from 'styled-components'
import Menu from './Menu'
import api from '../api';

const S_main = styled.main`
  padding: 10px;
`

class Public extends Component {
  
  state = {
  }

  componentWillMount() {
    api.hotProducts()
      .then((res) => {
        const { data } = res
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        <Menu />
        <S_main>
          Product
        </S_main>
      </div>
    )
  }
}

export default Public