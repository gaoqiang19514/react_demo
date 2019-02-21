import React, { Component } from 'react'
import {
  Router,
  Route,
  Switch
} from "react-router-dom"

import './App.css'

import Loading from './common/Loading'
import Auth from './common/Auth'
import Login from './components/Login'
import Order from './components/Order'
import Index from './components/Index'
import Redeem from './components/Redeem'
import Cate from './components/Cate'
import DoubleColorBall from './components/DoubleColorBall'
import Product from './components/Product'
import Buy from './components/Buy'

import Test from './components/Test'

import history from './history'

const NotFound = () => <h1>Not Found</h1>;

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={ Index } />
            <Route path="/login" component={Login} />

            <Auth path="/order" component={ Order } />

            <Route path="/redeem" component={Redeem} />
            <Route path="/cate" component={Cate} />
            <Route path="/double_color_ball" component={DoubleColorBall} />
            
            <Route path="/product" component={Product} />
            <Route path="/buy/:id" component={Buy} />

            <Route path="/test" component={Test} />

            <Route render={ ()=> <NotFound /> } />
          </Switch>
          <Loading />
        </div>
      </Router>
    );
  }
}

export default App;