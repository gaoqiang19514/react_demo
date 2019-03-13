import React, { Component } from 'react'
import styled from 'styled-components'
import weui from 'weui.js'

import closeIcon from '../asset/images/icon/close.png'
import showIcon from '../asset/images/icon/show.png'
import hideIcon from '../asset/images/icon/hide.png'
import api from '../api';
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
// const MiniPrimaryButton = styled(Button)`
//   color: #fff;
//   font-size: 12px;
//   padding: 5px 10px;
//   border-radius: 3px;
//   background: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
// `
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
// const BigPrimaryInput = styled(Input)`
//   color: #444;
//   font-size: 16px;
//   font-weight: bold;
//   font-family: industry;
// `
const PrimaryInput = styled(Input)`
  color: #444;
  font-size: 14px;
`

const LayoutBox = styled.div`
  margin: 15px;
`
const LayoutGroup = styled.div`
  position: relative;
  display: flex;
  padding: 15px;
  align-items: center;
  &:after{
    content: " ";
    position: absolute;
    left: 15px;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  &:last-child:after{
    content: none;
  }
`
const LayoutBody = styled.div`
  flex: 1;
`
const LayoutFoot = styled.div`
  display: flex;
  margin-left: 10px;
`

const StyledBg = styled.div`
  border-radius: 3px;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(26, 26, 26, 0.1);
`
const StyledCleanIcon = styled.img`
  width: 25px;
  height: 25px;
`
const StyledToggleIcon = styled.img`
  width: 25px;
  height: 25px;
`

const iconSchema = {
  text: showIcon,
  password: hideIcon
}

class Transfer extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.passwordToggle = this.passwordToggle.bind(this)
    this.integralClean = this.handleClean.bind(this, 'integral')
    this.usernameClean = this.handleClean.bind(this, 'username')
    this.accountClean = this.handleClean.bind(this, 'account')
    this.passwordClean = this.handleClean.bind(this, 'password')
    this.updateButtonStatus = this.updateButtonStatus.bind(this)

    this.state = {
      pass: false,
      integral: '',
      integralCleanView: false,
      username: '',
      usernameCleanView: false,
      account: '',
      accountCleanView: false,
      password: '',
      passwordCleanView: false,
      passwordType: 'password',
      passwordIcon: iconSchema['password']
    }
  }

  handleClean(key) {
    this.setState({[key]: ''})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.updateButtonStatus()
    })
  }

  handleFocus(e) {
    this.setState({[`${e.target.name}CleanView`]: true})
  }

  handleBlur(e) {
    const key =`${e.target.name}CleanView`
    setTimeout(() => {
      this.setState({[key]: false}, () => {
        this.updateButtonStatus()
      })
    }, 100)
  }

  handleSubmit(e) {
    const loading = weui.loading('处理中')
    api.transfer({
        integral: this.state.integral,
        username: this.state.username,
        account: this.state.account,
        password: this.state.password
      })
      .then(res => {
        const {data} = res
        if(data.code === '1') {
          weui.alert('转赠成功')
        }else {
          weui.alert(data.msg)
        }
      })
      .then(() => {
        loading.hide()
      })
      .catch(err => {
      })
  }

  passwordToggle() {
    const type = this.state.passwordType === 'password' ? 'text' : 'password'
    this.setState({passwordType: type, passwordIcon: iconSchema[type]})
  }

  updateButtonStatus() {
    let flag = true
    const {integral, username, account, password} = this.state
    if(!integral) {
      flag = false
    }
    if(!username) {
      flag = false
    }
    if(!account) {
      flag = false
    }
    if(!password) {
      flag = false
    }
    this.setState({pass: flag})
  }

  render() {
    const {integralCleanView, usernameCleanView, accountCleanView, passwordCleanView} = this.state
    return (
      <div>
        <LayoutBox>
          <StyledBg>
            <LayoutGroup>
              <LayoutBody>
                <PrimaryInput 
                  type="text" 
                  name="integral" 
                  value={this.state.integral} 
                  onChange={this.handleChange} 
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  placeholder="请输入转赠的积分" 
                />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon style={{visibility: integralCleanView ? 'visible' : 'hidden'}} onClick={this.integralClean} src={closeIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
            <LayoutGroup>
              <LayoutBody>
                <PrimaryInput 
                  type="text" 
                  name="username" 
                  value={this.state.username} 
                  onChange={this.handleChange} 
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  placeholder="请输入对方名称" 
                />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon style={{visibility: usernameCleanView ? 'visible' : 'hidden'}} onClick={this.usernameClean} src={closeIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
            <LayoutGroup>
              <LayoutBody>
                <PrimaryInput 
                  type="text" 
                  name="account" 
                  value={this.state.account} 
                  onChange={this.handleChange} 
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  placeholder="请输入对方登录账号"
                />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon style={{visibility: accountCleanView ? 'visible' : 'hidden'}} onClick={this.accountClean} src={closeIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
            <LayoutGroup>
              <LayoutBody>
                <PrimaryInput 
                  type={this.state.passwordType} 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.handleChange} 
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  placeholder="请输入交易密码"
                />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon style={{visibility: passwordCleanView ? 'visible' : 'hidden'}} onClick={this.passwordClean} src={closeIcon} alt="" />
                <StyledToggleIcon onClick={this.passwordToggle} src={this.state.passwordIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
          </StyledBg>
        </LayoutBox>
        <LayoutBox>
          {this.state.pass
            ? <PrimaryButton onClick={this.handleSubmit}>转赠</PrimaryButton>
            : <DisablePrimaryButton>转赠</DisablePrimaryButton>}
        </LayoutBox>
      </div>
    )
  }
}

export default Transfer