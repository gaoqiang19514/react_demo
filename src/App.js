import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  withRouter
} from "react-router-dom";
import VConsole from 'vconsole'

import './App.css';

import Menu from './components/Menu'

import Loading from './components/Loading';
import Auth from './components/Auth';
import Login from './components/Login';
import Protected from './components/Protected'
import Order from './components/Order'

// init vConsole
var vConsole = new VConsole()

const Public = () => {
    return (
        <div>
            <Menu />
            <h1>Public</h1>
        </div>
    )
}

const NotFound = () => <h1>Not Found</h1>;

class App extends Component {
    render() {
        return (
            <Router>
                <Route
                    render={ ({ location }) => {
                        return  (
                            <div>

                                <main>
                                    <Switch>
                                        <Route path="/" exact component={Public} />
                                        <Auth path="/protected" component={Protected} />
                                        <Auth path="/order" component={ Order } />
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
