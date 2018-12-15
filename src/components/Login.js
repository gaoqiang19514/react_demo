import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import api from '../api';

class Login extends Component {

    login = () => {
        const username = 'tom';
        const pswd = '123456';

        api.login(username, pswd)
            .then((response) => {
                const { data } = response
                this.props.login({
                    token: data.token
                });
            })
            .catch((error) => {
                console.log(error);
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
                <h1>Login Page</h1>
                <button onClick={ this.login }>login</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (payload) => dispatch({ type: 'LOGIN', token: payload.token })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));