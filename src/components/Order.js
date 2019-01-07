import React, { Component } from 'react'
import api from '../api'
import util from '../util'
import { hidden } from 'ansi-colors';

const fixedStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0
}

const siblingStyle = {
  height: '50px'
}

const navStyle = {
  display: 'flex',
  background: '#f7f7f8'
}

const navItemStyle = {
  lineHeight: '50px',
  flex: 1,
  textAlign: 'center'
}

const itemStyle = {
  display: 'flex',
  padding: '10px'
}

const small = {
  color: '#888',
  fontSize: '12px',
  marginRight: '10px'
}

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '15px',
  // overflow: 'hidden',
  // textOverflow: 'ellipsis',
  // whiteSpace: 'nowrap'
}

const imgStyle = {
  flexShrink: 0,
  marginRight: 10,
  width: '60px',
  height: '60px'
}

const main = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const Item = (props) => (
  <div style={ itemStyle }>
    <img style={ imgStyle } src={ props.img } alt=""/>
    <div style={ main }>
      <div style={ titleStyle }>{ props.name }</div>
      <div>
        <span style={ small }>{ props.date }</span>
        <span style={ small }>￥{ props.age }</span>
      </div>
    </div>
  </div>
)

class Order extends Component {
  state = {
    list: []
  }

  componentWillMount() {
    api.getOrderList()
      .then((res) => {
        const { data } = res
        this.setState({
          list: data
        })
      })
      .catch((err) => {
      })
  }

  render() {
    const { list } = this.state
    
    const todoItems = list.map(item => <Item key={ item.id } img={ item.img } name={ item.name } age={ item.age } date={ item.date } /> )
 
    return (
      <div>
        <div>
          <div style={ siblingStyle }></div>
          <div style={ { ...navStyle, ...fixedStyle } }>
            <a style={ navItemStyle }>处理中</a>
            <a style={ navItemStyle }>成功</a>
            <a style={ navItemStyle }>失败</a>
          </div>
        </div>

        { todoItems }
      </div>
    )
  }
}

export default Order