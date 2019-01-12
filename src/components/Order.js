import React, { Component } from 'react'
import axios from 'axios'
import api from '../api'
import util from '../util'
import { hidden } from 'ansi-colors'
import styled from 'styled-components'
import { dispatch } from 'rxjs/internal/observable/range';

import { Protal } from './Layout'


const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const StyleNavItem = styled.a`
  flex: 1;
  line-Height: 50px;
  text-align: center;
  transition: all .3s ease;
  &.active{
    font-weight: bold;
    color: red;
  }
`

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

const loadingStyle = {
  textAlign: 'center',
  padding: '15px 0'
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

let status = '1'
let currentPage = 1
let nextRequestId = 0

class Order extends Component {
  state = {
    showLoading: true,
    isLoad: false,
    list: []
  }

  componentWillMount() {
    this.loadNextPage(status, currentPage)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
  }

  scrollListener = () => {
    if(this.state.isLoad){ return }

    const scrollEl = window
    const doc = document.documentElement || document.body.parentNode || document.body
    const scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop
    const winHeight = window.innerHeight
    const docHeight = this.itemsElem.offsetHeight
    if((scrollTop + winHeight) >= docHeight){
      this.setState({ isLoad: true })
      this.loadNextPage(status, ++currentPage)
    }
  }

  loadNextPage = (status, page) => {
    const reqId = ++nextRequestId

    const ifNextRequestValid = (cb) => {
      if(nextRequestId === reqId){
        console.log('finished')
        cb && cb()
      }
    }

    api.getOrderList(status, page)
      .then((res) => {
        ifNextRequestValid(() => {
          const { data } = res
          if(data && data.length){
            this.setState({
              isLoad: false,
              list: [...this.state.list, ...data]
            })
          }else{
            this.setState({
              showLoading: false
            })
          }
        })
      })
      .catch((err) => {
        ifNextRequestValid(() => {
          console.log('err', err)
        })
      })    
  }

  clickHandle = (e) => {
    this.setState({
      list: []
    })
    currentPage = 1
    status = e.target.getAttribute('data-status')
    this.loadNextPage(status, currentPage)
  }

  render() {
    const { list } = this.state
    
    const items = list.map(item => <Item key={ item.id } img={ item.img } name={ item.name } age={ item.age } date={ item.date } /> )

    return (
      <div>
        <Protal>
          <header>
            <StyleNavItem className={ status === '1' ? 'active' : '' } onClick={this.clickHandle} data-status="1">处理中</StyleNavItem>
            <StyleNavItem className={ status === '2' ? 'active' : '' } onClick={this.clickHandle} data-status="2">成功</StyleNavItem>
            <StyleNavItem className={ status === '3' ? 'active' : '' } onClick={this.clickHandle} data-status="3">失败</StyleNavItem>
          </header>
          <main>
            <div ref={node => this.itemsElem = node}>
              { items }
            </div>
            { this.state.showLoading ? <div style={ loadingStyle }>loading...</div> : <div style={ loadingStyle }>done</div> }
          </main>
        </Protal>
      </div>
    )
  }
}

export default Order