import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'

const Portal = (props) => {
  return ReactDOM.createPortal(
    props.children,
    props.node
  )
}

const defaultProps = {
  unmountOnClose: true,
  zIndex: 1050
}

class Modal extends Component {
  constructor(props) {
    super(props)

    this._element = null
    this.onClosed = this.onClosed.bind(this)

    this.state = {isOpen: props.isOpen}

    if(props.isOpen) {
      this.init()
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen && !this.state.isOpen) {
      this.setState({isOpen: nextProps.isOpen})
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.isOpen && !this.state.isOpen) {
      this.init()
    }
  }
  
  init() {
    if(!this._element) {
      this._element = document.createElement('div')
      this._element.setAttribute('tabindex', '-1')
      this._element.style.position = 'relative'
      this._element.style.zIndex = this.props.zIndex
      document.body.appendChild(this._element)
    }    
  }

  destroy() {
    if(this._element) {
      document.body.removeChild(this._element)
      this._element = null
    }
  }

  onClosed() {

    if(this.props.unmountOnClose) {
      this.destroy()
    }

    this.setState({isOpen: false})
  }

  render() {
    if(this.state.isOpen) {
      return (
        <Portal node={this._element}>
          <Transition
            in={this.props.isOpen}
            timeout={300}
            onExited={this.onClosed}
          >
            {(state) => {
              return (
                <div>{this.props.children}</div>
              )
            }}
          </Transition>
        </Portal>
      )
    }

    return null
  }
}

Modal.defaultProps = defaultProps

export default class Test extends Component {
  state = {isOpen: false}

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>toggle</button>
        <Modal isOpen={this.state.isOpen}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nesciunt exercitationem explicabo non veniam? Dolorum voluptatem distinctio sed, necessitatibus laudantium pariatur error dolore iste nam autem quis aspernatur sit esse.
        </Modal>
      </div>
    )
  }
}