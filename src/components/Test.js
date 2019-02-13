import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flattenProp, renameProp, compose } from 'recompose'

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

















const Profile = ({name, age, innerWidth}) => {
  return (
    <div>
      <div>name: {name}</div>
      <div>Age: {age}</div> 
      <div>innerWidth: {innerWidth}</div>
    </div>
  )
}

Profile.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number
}

const enhance = compose(
  flattenProp('user'),
  renameProp('username', 'name'),
  withInnerWidth
)

// 向ProfileWithFlattenUser传入一个user对象 user会被flattenProp展开为扁平的username和age
const ProfileWithFlattenUser = enhance(Profile) 

export default function(){
  return <ProfileWithFlattenUser user={{username: 'tom', age: 28}} />
}