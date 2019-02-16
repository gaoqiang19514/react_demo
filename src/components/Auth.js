import React from 'react'
import { Route, Redirect, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

const Auth = ({component: Part, isAuthenticated, ...rest}) => (
  <Route {...rest}
    render={ props => {
      if(isAuthenticated){
        return <Part {...props} />
      }else{
        const to = { pathname: "/login", state: { from: props.location } }
        return <Redirect to={to} />
      }
    }}
  />
)

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.isAuthenticated }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));