import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "50px"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "50px",
  width: "100%",
  display: "flex",
  background: '#ccc'
};

styles.page = {
  position: "absolute",
  padding: 15,
  fontSize: 22
}

styles.title = {
  marginBottom: 10
}

const One = () => {
  return (
    <div style={styles.page}>
      <img src="https://i1.hdslb.com/bfs/archive/87826ab6a89bf5d1f6f95be6f25e63dea17ad5b8.jpg@160w_100h.webp" alt=""/>
    </div>
  )
}

const Two = () => {
  return (
    <div style={styles.page}>
      <img src="https://i1.hdslb.com/bfs/archive/ccee18a808c745a804f4bb87a167839c1a0343ae.jpg@160w_100h.webp" alt=""/>
    </div>
  )
}

export default class extends Component {

  render() {
    return (
      <Route render={ ({ location }) => {
          return(
            <div style={styles.fill}>
              <nav style={styles.nav}>
                <Link to="/transition/one">one</Link>
                <Link to="/transition/two">two</Link>
              </nav>
              <div style={styles.content}>
                <TransitionGroup>
                  <CSSTransition key={location.key} classNames="fade" appear={true} timeout={{enter: 500, exit: 300}} >
                    <Switch location={location}>
                      <Route exact path="/transition/one" component={One} />
                      <Route exact path="/transition/two" component={Two} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
          )
        }
      } />
    )
  }
}