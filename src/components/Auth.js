import React, { Component } from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import * as session from '../services/session';

class Auth extends Component {

    UNSAFE_componentWillMount() {
        if (this.props.isAuthenticated) {
            return;
        }
        if(session.isAuthenticated()){
            const token = session.getToken();
            this.props.authSuccess(token);
        }else{
            this.props.unauthenticate();
        }
    }

    render() {
        const { component: Part, isAuthenticated, ...rest } = this.props;

        return (
            <Route {...rest}
                render={ props => {
                    if(isAuthenticated){
                        return  <Part {...props} />;
                    }else{
                        const to = { pathname: "/login", state: { from: props.location } }
                        return <Redirect to={to} />;
                    }
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        unauthenticate: () => dispatch({
            type: 'UNAUTH_USER'
        }),
        authSuccess: (token) => dispatch({
            type: 'AUTH_SUCCESS',
            payload: { token: token }
        })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));