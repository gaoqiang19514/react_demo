import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components'

import api from '../api';
const S_main = styled.main`
  padding: 10px;
`
class Login extends Component {

    login = () => {
        const username = 'test';
        const pswd = 'react';

        this.props.showLoading()
        api.login(username, pswd)
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
                <S_main>
                    Login
                </S_main>
                <div className="btn-wrap">
                    <button onClick={ this.login }>login</button>
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