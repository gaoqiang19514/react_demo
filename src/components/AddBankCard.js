import React, { Component } from 'react';
import styled from 'styled-components'

const Group = styled.div`
  display: flex;
  padding: 15px;
  background: #fff;
`
const GroupHead = styled.div`
  label{
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
    font-size: 14px;
    width: 90px;
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
    background: #ccc;
    &.active{
      box-shadow: 0 0.03rem 0.05rem rgba(207, 162, 95, .58);
      background-image: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
    }
`
const StyledButtonBox = styled.div`
  margin: 15px;
`

class AddBankCard extends Component {

  state = {
    validationPassFlag: false,
    id: '',
    name: '',
    phone: '',
    cardNo: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(!this.state.validationPassFlag){
      alert('请填写完整')
      return
    }

    alert('进入提交流程')
    // 1 收集信息
    // 2 校验
    // 3 发起请求
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      const { id, name, phone, cardNo } = this.state
      if(id && name && phone && cardNo){
        this.setState({validationPassFlag: true})
      }else{
        this.setState({validationPassFlag: false})
      }
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
            <PrimaryButton className={this.state.validationPassFlag ? 'active' : ''} type="submit">下一步</PrimaryButton>
          </StyledButtonBox>
        </form>        
      </div>
    )
  }
}

export default AddBankCard