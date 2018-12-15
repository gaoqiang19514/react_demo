import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';

import Auth from './components/Auth';
import Login from './components/Login';


const Public = () => <h1>Public</h1>;

const NotFound = () => <h1>Not Found</h1>;

const Protected = ({ logout }) => (
    <div>
        <h1>Protected</h1>
        <button onClick={ logout }>退出</button>
    </div>
);

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch({ type: 'LOGOUT' })
        }
    }
}

const Protected2 = withRouter(connect(null, mapDispatchToProps)(Protected));

class App extends Component {
    render() {
        return (
            <Router>
                <Route
                    render={ ({ location }) => {
                        return  (
                            <div>
                                <nav>
                                    <NavLink to="/public">Public Page</NavLink>
                                    <NavLink to="/protected">Protected Page</NavLink>
                                </nav>
                                <main>
                                    <Switch>
                                        <Route path="/public" component={Public} />
                                        <Auth path="/protected" component={Protected2} />
                                        <Route path="/login" component={Login} />
                                        <Route render={ () => <NotFound /> } />
                                    </Switch>
                                </main>
                            </div>
                        )
                    }}
                />
            </Router>
        );
    }
}

export default App;
