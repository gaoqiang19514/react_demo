import React, { Component } from 'react'
import styled from 'styled-components'
import weui from 'weui.js'
import {Link} from 'react-router-dom'
import classNames from 'classNames'

import api from '../api'
import util from '../util'
import qia from '../asset/images/icon/qia.png'

/*
 |--------------------------------------------------------------------------
 | button
 |--------------------------------------------------------------------------
 */
const Button = styled.button`
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  display: block;
  background: transparent;
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
const MiniPrimaryButton = styled(Button)`
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 3px;
  background: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`
/*
 |--------------------------------------------------------------------------
 | input
 |--------------------------------------------------------------------------
 */
const Input = styled.input`
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  color: inherit;
  font-size: inherit;
  -webkit-appearance: none;
  background: transparent;
`
const PrimaryInput = styled(Input)`
  color: #444;
  font-size: 16px;
  font-weight: bold;
  font-family: industry;
`
const MinPrimaryInput = styled(Input)`
  font-family: industry;
  font-size: 14px;
`



const StyledBg = styled.div`
  padding: 1px 0;
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
  margin: 15px;
`

const Text = styled.div`
  color: #888;
  font-size: 14px;
`
const SmallText = styled(Text)`
  font-size: 12px;
`
const StyledNoBankCard = styled.div`
  color: #888;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

const LayoutGroup = styled.div`
  display: flex;
  align-items: center;
`
const LayoutBody = styled.div`
  flex: 1;
`
const LayoutFoot = styled.div`
  margin-left: 10px;
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
        <p className="title">{bankCardName}(尾号<span className="card">{util.getBankCardLastNum(bankCardNo)}</span>)</p>
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
      integral: '',
      smsCode: '',
      pass: false,
      loading: false,
      hasBankCard: false,
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
    this.setState({bankCardNo, bankCardName}, () => {
      this.setState({
        hasBankCard: true
      })
    })
  }

  clickHandle() {
    if(!this.state.bankCardList.length) {
      return false
    }
    weui.picker(util.parseBankCardList(this.state.bankCardList), {
      defaultValue: [0],
      onConfirm: result => {
        if(result && result[0]){
          this.setCurrBankCard(result[0].bankCardNo, result[0].bankCardName)
        }
      }
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value}, () => {
      if(this.state.integral >= MIN_INTEGRAL 
        && this.state.integral <= MAX_INTEGRAL 
        && this.state.bankCardNo 
        && this.state.integral 
        && this.state.smsCode) {
        this.setState({pass: true})
      }else {
        this.setState({pass: false})
      }
    })

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
          {this.state.hasBankCard
            ? <BankCard bankCardNo={bankCardNo} bankCardName={bankCardName} />
            : <StyledNoBankCard>暂无可用银行卡</StyledNoBankCard>}
        </Layout_M_XXX>
        <Layout_M_XXX>
          <PrimaryInput 
            type="text"
            name="integral"
            value={this.state.integral} 
            onChange={this.handleChange}
            placeholder="最多可赎回892积分"
          />
        </Layout_M_XXX>
        <Layout_M_XXX>
          <Text>实际扣除0积分</Text>
          <Text>实际到账0元(手续费0积分，100积分等于1元)</Text>
        </Layout_M_XXX>
        <Layout_M_XXX>
          <LayoutGroup>
            <LayoutBody>
              <MinPrimaryInput 
                type="text"
                name="smsCode"
                value={this.state.smsCode} 
                onChange={this.handleChange} 
                placeholder="请输入短信验证码"
              />
            </LayoutBody>
            <LayoutFoot>
              <MiniPrimaryButton>获取短信验证码</MiniPrimaryButton>
            </LayoutFoot>  
          </LayoutGroup>
        </Layout_M_XXX>   
        <Layout_M_XXX>
          <SmallText>
            同意用户<Link to="/redeen-agreement">《赎回规则协议》</Link>
          </SmallText>
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