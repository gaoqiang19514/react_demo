import React, { Component } from 'react'
import styled from 'styled-components'
import weui from 'weui.js'
import classNames from 'classNames'

import api from '../api'
import util from '../util'
import qia from '../asset/images/icon/qia.png'

const Button = styled.button`
  outline: none;
  display: block;
  border: 0;
  width: 100%;
  padding: 0;
`
const PrimaryButton = styled(Button)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
  border-radius: 3px;
  box-shadow: 0 3px 5px rgba(207, 162, 95, .58);
  background: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`
const DisablePrimaryButton = styled(Button)`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 50px;
  border-radius: 3px;
  background: #ccc;
`

const StyledBg = styled.div`
  background: #fff;
`
const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
  .icon{
    width: 20px;
    height: 20px;
    display: block;
  }
`
const StyledCard = styled.div`
  display: flex;
  padding: 15px;
  .icon{
    width: 40px;
    height: 40px;
    display: block;
  }
  .card{
    font-family: industry;
  }
  .main{
    flex: 1;
    margin-left: 10px;
    p{
      margin: 0;
    }
    .title{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .text{
      line-height: 1.5;
      font-size: 12px;
      color: #888;
    }
  }
`
const Layout_M_XXX = styled.div`
  padding: 15px;
`
const Input = styled.input`
  outline: none;
  border: 0;
  padding: 0;
  width: 100%;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
`
const PrimaryInput = styled(Input)`
  font-size: 16px;
  font-weight: bold;
`
const Text = styled.div`
  color: #888;
  line-height: 1.7;
  font-size: 14px;
`
const StyledNoBankCard = styled.div`
  color: #888;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

const MIN_INTEGRAL = 100
const MAX_INTEGRAL = 5000000

const BankCard = ({bankCardNo, bankCardName}) => {
  return (
    <StyledCard>
      <div className="aside">
        <img className="icon" src={qia} alt=""/>
      </div>
      <div className="main">
        <p className="title">{bankCardName}(尾号<span className="card">0000</span>)</p>
        <p className="text">预计下一工作日到账，实际以银行到账日为准</p>
      </div>
    </StyledCard>
  )
}

class Redeem extends Component {
  constructor(props) {
    super(props)

    this.clickHandle = this.clickHandle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setCurrBankCard = this.setCurrBankCard.bind(this)

    this.state = {
      value: '',
      pass: false,
      loading: false,
      bankCardList: [],
      bankCardNo: '',
      bankCardName: ''
    }
  }

  componentDidMount() {
    api.getBankCardList()
      .then(res => {
        const {data} = res
        if(data.code === '1') {
          this.setState({bankCardList: data.items}, () => {
            const firstBankCard = data.items[0]
            if(firstBankCard) {
              this.setCurrBankCard(firstBankCard.bankCardNo, firstBankCard.bankCardName)
            }
          })
        }
      })
  }

  setCurrBankCard(bankCardNo, bankCardName) {
    this.setState({bankCardNo, bankCardName})
  }

  clickHandle() {
    weui.picker(util.parseBankCardList(this.state.bankCardList), {
      defaultValue: [0],
      onConfirm: result => {
        if(result && result[0]){
          this.setCurrBankCard(result[0].value, result[0].label)
        }
      }
    })
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({value})
    if(value >= MIN_INTEGRAL && value <= MAX_INTEGRAL) {
      this.setState({pass: true})
    }else {
      this.setState({pass: false})
    }
  }

  submitHandle = () => {
    console.log('submitHandle')
  }

  render() {
    const {bankCardNo, bankCardName} = this.state
    // const bankCardNoLast = bankCardNo.substring(bankCardNo.length - 4, bankCardNo.length)

    return (
      <StyledBg>
        <Layout_M_XXX>
          <StyledBar>
            <span>转入银行卡</span>
            <img className="icon" onClick={this.clickHandle} src={qia} alt=""/>
          </StyledBar>
        </Layout_M_XXX>
        <Layout_M_XXX>
          <StyledNoBankCard>
            暂无可用银行卡
          </StyledNoBankCard>
          <BankCard bankCardNo={bankCardNo} bankCardName={bankCardName} />
        </Layout_M_XXX>
        <Layout_M_XXX>
          <PrimaryInput 
            type="text"
            value={this.state.value} 
            onChange={this.handleChange}
            placeholder="最多可赎回892积分"
          />
        </Layout_M_XXX>
        <Layout_M_XXX>
          <Text>实际扣除0积分</Text>
          <Text>实际到账0元(手续费0积分，100积分等于1元)</Text>
        </Layout_M_XXX>
        <Layout_M_XXX>
          {this.state.pass
            ? <PrimaryButton onClick={this.submitHandle}>确认赎回</PrimaryButton>
            : <DisablePrimaryButton>确认赎回</DisablePrimaryButton>}
        </Layout_M_XXX>
      </StyledBg>
    )
  }
}

export default Redeem