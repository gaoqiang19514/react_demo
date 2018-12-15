import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";
import './App.css';

import Auth from './components/Auth';
import Login from './components/Login'

const Public = () => <h1>Public</h1>;
const Protected = () => <h1>Protected</h1>;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <NavLink to="/public">Public Page</NavLink>
                        <NavLink to="/protected">Protected Page</NavLink>
                    </nav>

                    <main>
                        <Route path="/public" component={Public} />
                        <Auth path="/protected" component={Protected} />

                        <Route path="/login" component={Login} />
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
