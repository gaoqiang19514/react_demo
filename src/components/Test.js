import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flattenProp, renameProp, compose } from 'recompose'
import { connect as refetchConnect } from 'react-refetch'

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


// 利用高阶组件来抽离重复的代码逻辑

const Gist = ({description, star}) => (
  <li>
    {description}
    <button onClick={star}>+1</button>
  </li>
)
Gist.propTypes = {
  description: PropTypes.string,
  star: PropTypes.func
}

const token = 'access_token=290f845da84b3bc730dac9fd89eae1bb878d7c25'

const connectWithStar = refetchConnect(({id}) => ({
  star: () => ({
    starResponse: {
      url: `https://api.github.com/gists/${id}/star?${token}`,
      method: 'PUT'
    }
  })
}))

const GistWith = connectWithStar(Gist)

const List = ({gists}) => {
  if (gists.pending) {
    return <div>loading...</div>
  } else if (gists.rejected) {
    return <div>{gists.reason}</div>
  } else if (gists.fulfilled) {
    return (
      gists.fulfilled && <ul>
        {gists.value.map(gist => <GistWith key={gist.id} {...gist} />)}
      </ul>
    )
  }
}
List.propTypes = {
  gists: PropTypes.object
}


// const List = ({data: gists}) => {
//   return (
//     <ul>
//       {gists.map(gist => (
//         <li key={gist.id}>{gist.description}</li>
//       ))}
//     </ul>
//   )
// }

// const withData = url => Part => {
//   return class extends Component {
//     state = {data: []}

//     componentDidMount() {
//       fetch(url)
//         .then(response => response.json ? response.json() : response)
//         .then(data => this.setState({data}))
//     }

//     render() {
//       return <Part {...this.state} {...this.props} />
//     }
//   }
// }

// const ListWithGists = withData('https://api.github.com/users/gaearon/gists')(List)
// or
const ListWithGists = refetchConnect(() => ({gists: `https://api.github.com/users/gaearon/gists`}))(List)

export default function(){
  return true ? <ListWithGists /> : 'nothing...'
}