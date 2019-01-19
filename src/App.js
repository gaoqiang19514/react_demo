import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import VConsole from 'vconsole'

import './App.css';

import Loading from './components/Loading';
import Auth from './components/Auth';
import Login from './components/Login';
import Protected from './components/Protected'
import Order from './components/Order'
import Index from './components/Index'
import Transition from './components/Transition'
import Recharge from './components/Recharge'

// init vConsole
// var vConsole = new VConsole()

const NotFound = () => <h1>Not Found</h1>;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={ Index } />
                        <Auth path="/protected" component={ Protected } />
                        <Auth path="/order" component={ Order } />
                        <Route path="/login" component={Login} />
                        <Route path="/transition" component={Transition} />
                        <Route path="/recharge" component={Recharge} />
                        <Route render={ () => <NotFound /> } />
                    </Switch>
                    <Loading />
                </div>
            </Router>
        );
    }
}

export default App;
