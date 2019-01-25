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
  display: flex;
  align-items: center;
`
const GroupHead = styled.div`
`
const GroupBody = styled.div`
  flex: 1;
`
const GroupFoot = styled.div`
`

const FromLabel = styled.label`
`
const FromInput = styled.input`
`
const FromBtn = styled.button`
`

const A = styled.a`
    color: #333;
    font-size: 12px;
    text-decoration: none;
`
const PrimaryButton = styled(Button)`
    line-height: 50px;
    height: 50px;
    border-radius: 3px;
    background-image: linear-gradient(90deg,#ffc637,#ff9537);
    box-shadow: 0 5px 10px 0 rgba(255,159,46,.4);
`

class Login extends Component {
  // test react
  state = {
    username: '',
    password: ''
  }

    login = () => {
      const { username, password } = this.state

      this.props.showLoading()
      api.login(username, password)
        .then((response) => {
            const { data } = response;
            this.props.login(data);
        })
        .catch((error) => {
        })
        .finally(() => {
            this.props.hideLoading()
        })
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
                  <Input 
                    type="text" 
                    name="username" 
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
                    onChange={this.handleChange} 
                    value={this.state.password} 
                    placeholder="请输入密码" 
                  />
                </GroupBody>
                <GroupFoot>
                  <A href="">忘记密码</A>
                </GroupFoot>
              </Group>   
            </div>
            <div className="u_m_xxx">
              <PrimaryButton className="u_fc_white" type="button" onClick={ this.login }>登录</PrimaryButton>
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