import React from 'react'

const style = {margin: '15px 0 30px 0'}

const itemStyle = {
  height: '25px',
  background: '#eee',
  margin: '10px 15px 10px 15px'
}
const item80Style = {
  ...itemStyle, 
  width: '80%'
}
const item50Style = {
  ...itemStyle, 
  width: '50%'
}
const item30Style = {
  ...itemStyle, 
  width: '30%'
}
const Item = () => {
  return (
    <div style={style}>
      <div style={itemStyle}></div>
      <div style={item80Style}></div>
      <div style={item50Style}></div>
      <div style={item30Style}></div>
    </div>    
  )
}

export default () => {
  return (
    <div style={{width: '100%'}}>
      <div style={style}>
        <Item />
      </div>
      <div style={style}>
        <Item />
      </div>
      <div style={style}>
        <Item />
      </div>
      <div style={style}>
        <Item />
      </div>
    </div>
  )
}