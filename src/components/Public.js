import React, { Component } from 'react';
import Menu from './Menu'
import api from '../api';

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
        Product
      </div>
    )
  }
}

export default Public