import React, { Component } from 'react';

const withInnerWidth = Part => {
  return class extends Component {
    state = {innerWidth: window.innerWidth}

    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    handleResize() {
      this.setState({innerWidth: window.innerWidth})
    }

    render() {
      return <Part {...this.props} {...this.state} />
    }
  }
}

const MyComponent = ({innerWidth}) => {
  return <div>MyComponent {innerWidth}</div>
}

const MyComponentWith = withInnerWidth(MyComponent)

export default function(){
  return <MyComponentWith />
}