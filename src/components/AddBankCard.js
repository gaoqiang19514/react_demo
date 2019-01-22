import React, { Component } from 'react';
import styled from 'styled-components'

const Group = styled.div`
  display: flex;
  padding: 15px;
  background: #fff;
`
const GroupHead = styled.div`
  label{
    text-align: right;
    font-size: 14px;
    width: 90px;
    display: flex;
  }
`
const GroupBody = styled.div`
  flex: 1;
`
const Input = styled.input`
  font-size: 14px;
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  background: transparent;
`
const Button = styled.button`
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  display: block;
  color: inherit;
  text-align: center;
  background: transparent;
`

const PrimaryButton = styled(Button)`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    line-height: 50px;
    border-radius: 3px;
    -webkit-box-shadow: 0 0.03rem 0.05rem rgba(207, 162, 95, .58);
    box-shadow: 0 0.03rem 0.05rem rgba(207, 162, 95, .58);
    background-image: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`

const StyledButtonBox = styled.div`
  margin: 15px;
`

class AddBankCard extends Component {

  state = {
    name: '',
    id: '',
    cardNo: '',
    phone: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // 1 收集信息
    // 2 校验
    // 3 发起请求
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Group>
            <GroupHead>
              <label>姓名：</label>
            </GroupHead>
            <GroupBody><Input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="请输入姓名"/></GroupBody>
          </Group>
          <Group>
            <GroupHead>
              <label>身份证号：</label>
            </GroupHead>
            <GroupBody><Input type="text" onChange={this.handleChange} value={this.state.id} name="id" placeholder="请输入身份证号"/></GroupBody>
          </Group>
          <Group>
            <GroupHead>
              <label>卡号：</label>
            </GroupHead>
            <GroupBody><Input type="text" onChange={this.handleChange} value={this.state.cardNo} name="cardNo" placeholder="请输入银行卡/信用卡号"/></GroupBody>
          </Group>
          <Group>
            <GroupHead>
              <label>手机：</label>
            </GroupHead>
            <GroupBody><Input type="text" onChange={this.handleChange} value={this.state.phone} name="phone" placeholder="请输入银行/信用卡预留手机号"/></GroupBody>
          </Group>
          <StyledButtonBox>
            <PrimaryButton type="submit">下一步</PrimaryButton>
          </StyledButtonBox>
        </form>        
      </div>
    )
  }
}

export default AddBankCard