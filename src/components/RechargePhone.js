import React, { Component } from 'react';
import { Route, Link } from "react-router-dom"
import styled from 'styled-components'
import classnames from 'classnames'

import SkeletonPlaceholder from '../common/SkeletonPlaceholder'
import util from '../util'
import config from '../config'
import api from '../api'
import { redirect } from '../services/redirect'

const Button = styled.button`
  padding: 0;
  width: 100%;
  border: 0;
  outline: none;
`
const PrimaryButton = styled(Button)`
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 3px;
  box-shadow: 0 3px 5px rgba(207, 162, 95, .58);
  background: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`
const PrimaryDisabledButton = styled(Button)`
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 3px;
  background: #ccc;
`


const StyledNav = styled.ul`
  display: flex;
  margin-bottom: 10px;
  background: #fff;
  li{
    position: relative;
    height: 60px;
    line-height: 60px;
    flex: 1;
    text-align: center;
    &.active{
      font-size: 16px;
      font-weight: bold;
      &:after{
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translate(-50%);
        content: '';
        display: block;
        height: 5px;
        border-radius: 5px;
        width: 20px;
        background: #e1c38c;
      }
    }
  }
`
const StyledMain = styled.div`

`
const Input = styled.input`
  border: 0;
  width: 100%;
  outline: none;
  padding: 0;
  background: transparent;
`
const StyledInput = styled(Input)`
  font-family: industry;
  font-size: 26px;
  margin-bottom: 15px;
`
const StyledInputBox = styled.div`
  margin: 15px;
  border-bottom: 1px solid #ccc;
`
const LayoutItem = styled.div`
  width: 33.33%;
  padding: 5px;
`
const StyledItem = styled.div`
  font-family: industry;
  padding: 10px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #eaeaea;
  &.active{
    color: #fff;
    background: #e1c38c;
    border-color: #c89850;
    .integral{
      color: #fff;
    }
  }
  .money{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .integral{
    color: #555;
    font-size: 12px;
  }
`
const LayoutItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 5px;
`
const Item = ({id, money, integral, clickHandle, index, currIndex}) => {
  return (
    <LayoutItem>
      <StyledItem 
        className={classnames({'active': currIndex === index})}
        onClick={() => clickHandle(id, index)}>
        <div className="money">{money}元</div>
        <div className="integral">售{integral}积分</div>
      </StyledItem>
    </LayoutItem>
  )
}

const CMCC = '1'
const CUCC = '2'
const CTCC = '3'

export default class extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.clickHandle = this.clickHandle.bind(this)
    this.loadProdcuts = this.loadProdcuts.bind(this)

    this.state = {
      loadFlag: false,
      passFlag: false,
      type: CMCC,
      items: [],
      currIndex: 0
    }
  }

  componentDidMount() {
    this.loadProdcuts(this.state.type)
  }

  toggle(e) {
    const type = e.currentTarget.getAttribute('data-type')
    this.setState({type: type}, () => {
      this.loadProdcuts(this.state.type)
    })
  }

  loadProdcuts(type) {
    this.setState({loadFlag: true})
    api.getRechargePhoneProductsByType(type)
      .then(res => {
        const {data} = res
        this.setState({items: data, loadFlag: false})
      })
      .then(() => {
        this.setState({loadFlag: false})
      })
  }

  clickHandle(id, index) {
    console.log(id, index)
    this.setState({currIndex: index})

  }

  render() {
    const {type, items, currIndex, loadFlag, passFlag} = this.state
    let list

    if(loadFlag) {
      list = <SkeletonPlaceholder />
    }else {
      list = items.map((item, index) => (
        <Item
          key={item.id}
          id={item.id}
          index={index}
          currIndex={currIndex}
          money={item.money}
          integral={item.integral}
          clickHandle={this.clickHandle}
        />
      ))
    }

    return (
      <div>
        <StyledNav>
          <li className={classnames({'active': type === CMCC })} onClick={this.toggle} data-type={CMCC}>中国移动</li>
          <li className={classnames({'active': type === CUCC })} onClick={this.toggle} data-type={CUCC}>中国联通</li>
          <li className={classnames({'active': type === CTCC })} onClick={this.toggle} data-type={CTCC}>中国电信</li>
        </StyledNav>
        <StyledMain>
          <StyledInputBox>
            <StyledInput type="text" placeholder="请输入手机号码" autoComplete="off" />
          </StyledInputBox>
          <h2 className="u_m_xx">请选择面值</h2>
          <LayoutItems>{list}</LayoutItems>
          <div className="u_m_xxx">
            {passFlag
              ? <PrimaryButton>立即充值</PrimaryButton>
              : <PrimaryDisabledButton>立即充值</PrimaryDisabledButton>
            }
          </div>
        </StyledMain>
      </div>
    )
  }
}