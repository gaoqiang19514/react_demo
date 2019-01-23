import React, { Component } from 'react';
import styled from 'styled-components'
import Util from '../util'

const StyledUl = styled.ul`
    list-style: none;
    margin: 5px;
    padding: 0;
  li{
    position: relative;
    height: 0;
    width: 14.2857%;
    padding-top: 14.2857%;
    text-align: center;
    .bg{
        position: absolute;
        padding: 3px;
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        background: #fff;        
        border: 1px dashed #eaeaea;

        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
`
const StyledRedBalls = styled(StyledUl)`
  display: flex;
  flex-wrap: wrap;
  color: red;

  li.active .bg{
    border-color: red;
  }
`
const StyledBlueBalls = styled(StyledUl)`
  display: flex;
  flex-wrap: wrap;
  color: blue;
  
  li.active .bg{
    border-color: blue;
  }
`

class DoubleColorBall extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redBalls: Util.creteNumSeriesString(1, 32),
      blueBalls: Util.creteNumSeriesString(1, 16),
      redBallPool: [],
      blueBallPool: []
    }
  }

  handleClick = (e) => {
    const num  = e.currentTarget.getAttribute('data-num')
    const pool = e.currentTarget.getAttribute('data-pool')
    this.setState({ [pool]: [...this.state[pool], num] })
  }

  render() {
    const { redBalls, blueBalls } = this.state
    return (
      <div>
        <StyledRedBalls>
          {redBalls.map((item) => <li
            key={item}
            data-num={item}
            data-pool="redBallPool"
            onClick={this.handleClick}
            className={(this.state.redBallPool.indexOf(item) > -1) ? 'active' : ''}>
              <div className="bg">{item}</div>
          </li>)}
        </StyledRedBalls>
        <StyledBlueBalls>
          {blueBalls.map((item) => <li
            key={item}
            data-num={item}
            data-pool="blueBallPool"
            onClick={this.handleClick}
            className={(this.state.blueBallPool.indexOf(item) > -1) ? 'active' : ''}>
              <div className="bg">{item}</div>
          </li>)}
        </StyledBlueBalls>
      </div>
    )
  }
}

export default DoubleColorBall

// 笔记

// 如何高亮选中的球呢？ 用数组的indexOf判检测当前号码是否存在于数组中方法
// 如果取消当前选中的球呢？ 从数组中删除当前点选的号码 参考方法splice slice
// 怎么判断当前点选是移除还是添加？ 查找数组中是否存在当前点选的号码 存在 ? 移除 ：添加
// 号码选择数量限制放在哪里？