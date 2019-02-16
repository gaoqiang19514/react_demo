import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const L_Container = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
`
const L_Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const L_Top = styled.div`
  line-height: 50px;
  background: #ccc;
`
const L_Main = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  overflow-y: auto;
`
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
const L_header = styled.header`
  display: flex;
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

  componentDidMount() {
    this.loadNextPage(status, currentPage)
    this.scrollContainer.addEventListener('scroll', this.scrollListener)
  }

  componentWillUnmount() {
    this.scrollContainer.removeEventListener('scroll', this.scrollListener)
  }

  scrollListener = () => {
    if(this.state.isLoad){ return }

    const scrollTop = this.scrollContainer.scrollTop
    const winHeight = this.scrollContainer.offsetHeight
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
    currentPage = 1
    this.setState({ list: [] })
    
    status = e.target.getAttribute('data-status')
    this.loadNextPage(status, currentPage)
  }

  render() {
    const { list } = this.state
    
    const items = list.map(item => <Item key={ item.id } img={ item.img } name={ item.name } age={ item.age } date={ item.date } /> )

    return (
      <L_Container>
        <L_Wrap>
          <L_Top>
            <L_header>
              <StyleNavItem className={ status === '1' ? 'active' : '' } onClick={this.clickHandle} data-status="1">处理中</StyleNavItem>
              <StyleNavItem className={ status === '2' ? 'active' : '' } onClick={this.clickHandle} data-status="2">成功</StyleNavItem>
              <StyleNavItem className={ status === '3' ? 'active' : '' } onClick={this.clickHandle} data-status="3">失败</StyleNavItem>
            </L_header>
          </L_Top>
          <L_Main ref={ node => this.scrollContainer = node }>
            <main ref={node => this.itemsElem = node}>
              <div>
                { items }
              </div>
              { this.state.showLoading ? <div style={ loadingStyle }>loading...</div> : <div style={ loadingStyle }>done</div> }            
            </main>
          </L_Main>
        </L_Wrap>
      </L_Container>
    )
  }
}

export default Order