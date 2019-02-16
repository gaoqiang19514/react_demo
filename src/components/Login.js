import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components'

import api from '../api';

const Input = styled.input`
  width: 100%;
  display: block;
  border: 0;
  padding: 0;
  outline: none;
  background: transparent;
`
const Button = styled.button`
  text-align: center;
  outline: none;
  width: 100%;
  padding: 0;
  display: block;
  border: 0;
  background: transparent;
`
const Group = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:after{
    content: '';
    position: absolute;
    left: 15px;
    right: 0;
    bottom: 0;
    height: 1px;
    background: #eaeaea;
    transform: scaleY(.5);
  }
  &:last-child:after{
    content: none;
  }
`
const GroupBody = styled.div`
  flex: 1;
`
const GroupFoot = styled.div`
  display: flex;
`

const FromInput = styled(Input)`
`
const FromButton = styled(Button)`
  line-height: 50px;
  height: 50px;
  border-radius: 3px;
  background-image: linear-gradient(90deg,#ffc637,#ff9537);
  box-shadow: 0 5px 10px 0 rgba(255,159,46,.4);
`
const A = styled.a`
  font-size: 12px;
  color: inherit;
  line-height: 1;
  text-decoration: none;
`
const FormLink = styled(A)`
  margin-left: 10px;
`
class Login extends Component {
  state = {
    username: 'test',
    password: 'react'
  }

  login = () => {
    const { username, password } = this.state

    setTimeout(() => {
      this.props.login({
        access_token: 'payload.access_token',
        refresh_token: 'payload.refresh_token'
      });
    }, 2000)

    // this.props.showLoading()
    // api.login(username, password)
    //   .then((response) => {
    //     const { data } = response;
    //     this.props.login(data);
    //   })
    //   .catch((error) => {
    //   })
    //   .finally(() => {
    //     this.props.hideLoading()
    //   })
  }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { isAuthenticated } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if(isAuthenticated){ return <Redirect to={ from } />; }

        return (
          <div>
            <h1 className="u_my_xxx u_mx_xxxx">登录</h1>
            <div className="u_bg_white u_m_xxx">
              <Group className="u_p_xxx">
                <GroupBody>
                  <FromInput 
                    type="text" 
                    name="username"
                    className="form__input"
                    onChange={this.handleChange} 
                    value={this.state.username} 
                    placeholder="请输入手机号" 
                  />
                </GroupBody>
              </Group>    
              <Group className="u_p_xxx">
                <GroupBody>
                  <Input 
                    type="password" 
                    name="password" 
                    className="form__input"
                    onChange={this.handleChange} 
                    value={this.state.password} 
                    placeholder="请输入密码" 
                  />
                </GroupBody>
                <GroupFoot>
                  <FormLink>忘记密码</FormLink>
                </GroupFoot>
              </Group>   
            </div>
            <div className="u_m_xxx">
              <FromButton className="u_fc_white" type="button" onClick={ this.login }>登录</FromButton>
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (payload) => dispatch({ type: 'AUTH_USER', payload: {
        access_token: payload.access_token,
        refresh_token: payload.refresh_token
    } }),
    showLoading: () => dispatch({ type: 'SHOW_LOADING' }),
    hideLoading: () => dispatch({ type: 'HIDE_LOADING' })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));