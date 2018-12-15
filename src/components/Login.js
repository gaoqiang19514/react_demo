import React, { Component } from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class Login extends Component {

    login = () => {
        this.props.login();
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
        login: () => dispatch({ type: 'LOGIN' })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));