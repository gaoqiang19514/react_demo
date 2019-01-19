import React, { Component } from 'react'
import styled from 'styled-components'

import qia from '../asset/images/icon/qia.png'

const StyledBg = styled.div`
  background: #fff;
`

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 15px;
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

const StyledWrap = styled.div`
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

const Text = styled.div`
  color: #888;
  line-height: 1.7;
  font-size: 14px;
`

const Button = styled.button`
  outline: none;
  display: block;
  border: 0;
  width: 100%;
  padding: 0;
`
const PrimaryButton = styled(Button)`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  border-radius: 3px;
  box-shadow: 0 0.03rem 0.05rem rgba(207, 162, 95, .58);
  background-image: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`

class Redeem extends Component {

  render() {
    return (
      <StyledBg>
        <StyledBar>
          <span>转入银行卡</span>
          <span>
            <img className="icon" src={qia} alt=""/>
          </span>
        </StyledBar>

        <StyledCard>
          <div className="aside">
            <img className="icon" src={qia} alt=""/>
          </div>
          <div className="main">
            <p className="title">建设银行 (尾号7008)</p>
            <p className="text">预计下一工作日到账，实际以银行到账日为准</p>
          </div>
        </StyledCard>

        <StyledWrap>
          <Input type="text" placeholder="最多可赎回892积分"/>
        </StyledWrap>

        <StyledWrap>
          <Text>实际扣除0积分</Text>
          <Text>实际到账0元(手续费0积分，100积分等于1元)</Text>
        </StyledWrap>

        <StyledWrap>
          <PrimaryButton>确认赎回</PrimaryButton>
        </StyledWrap>

      </StyledBg>
    )
  }
}

export default Redeem