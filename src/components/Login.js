import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components'

import api from '../api';

const StyledFrom = styled.form`
    margin: 0 15px;
`
const StyledGroup = styled.div`
    position: relative;
    padding: 15px;
    display: flex;
    background: #fff;
    &:after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        background: #eaeaea;
        transform: scaleY(.5);
    }
    &:last-child:after{
        content: none;
    }
`
const StyledGroupHead = styled.div`
    flex: 1;
`
const StyledGroupFoot = styled.div`
    margin-left: 10px;
`
const Input = styled.input`
    border: 0;
    padding: 0;
    outline: none;
    width: 100%;
`
const Button = styled.button`
    border: 0;
    padding: 0;
    outline: none;
    width: 100%;
    color: #fff;
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
const ButtonWrap = styled.div`
    margin: 15px 0;
`
const Title = styled.h1`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin: 30px 0;
`

class Login extends Component {
    state = {
        username: 'test',
        password: 'react'
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

    render() {
        const { isAuthenticated } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if(isAuthenticated){
            return <Redirect to={ from } />;
        }

        return (
            <div>
                <Title>登录</Title>
                <StyledFrom>
                    <div>
                        <StyledGroup>
                            <StyledGroupHead>
                                <Input type="text" value={this.state.username} placeholder="请输入手机号" />
                            </StyledGroupHead>
                        </StyledGroup>    
                        <StyledGroup>
                            <StyledGroupHead>
                                <Input type="password" value={this.state.password} placeholder="请输入密码" />
                            </StyledGroupHead>
                            <StyledGroupFoot>
                                <A href="">忘记密码</A>
                            </StyledGroupFoot>
                        </StyledGroup>   
                    </div>

                    <ButtonWrap>
                        <PrimaryButton type="button" onClick={ this.login }>登录</PrimaryButton>
                    </ButtonWrap>                                     
                </StyledFrom>
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