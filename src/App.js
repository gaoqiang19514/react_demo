import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  withRouter
} from "react-router-dom";


import './App.css';

import Loading from './components/Loading';
import Auth from './components/Auth';
import Login from './components/Login';
import Protected from './components/Protected'

const Public = () => <h1>Public</h1>;

const NotFound = () => <h1>Not Found</h1>;

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
                                        <Auth path="/protected" component={Protected} />
                                        <Route path="/login" component={Login} />
                                        <Route render={ () => <NotFound /> } />
                                    </Switch>
                                </main>

                                <Loading />
                            </div>
                        )
                    }}
                />
            </Router>
        );
    }
}

export default App;
