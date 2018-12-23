import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import api from '../api';

class Login extends Component {

    login = () => {
        const username = 'test';
        const pswd = 'react';

        // 显示loading
        api.login(username, pswd)
            .then((response) => {
                const { data } = response;
                this.props.login(data.token);
            })
            .catch((error) => {
            });
    }

    render() {
        const { isAuthenticated } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        if(isAuthenticated){
            return <Redirect to={ from } />;
        }

        return (
            <div>
                <h1>Login Page</h1>
                <button onClick={ this.login }>login</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.auth.isAuthenticated }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (token) => dispatch({ type: 'AUTH_SUCCESS', payload: {
            token: token
        } }),
        showLoading: () => dispatch({ type: 'SHOW_LOADING' }),
        hideLoading: () => dispatch({ type: 'HIDE_LOADING' })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));