import React, { Component } from 'react';
import { Route, Link } from "react-router-dom"
import styled from 'styled-components'
import Util from '../util'
import config from '../config'
import { redirect } from '../services/redirect'

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
const LayoutFixedBottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`
const StyledOperation = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  font-size: 14px;
  background: #fff;
  .block{
    padding: 0 15px;
  }
`
const LayoutFixed = styled.div`
  display: flex;
`
const LayoutLayer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #f7f7f8;
  &.active{
    transform: translateX(0);
  }
`
const LayoutScroller = styled.div`
  overflow-y: auto;
  height: 100%;
  padding-bottom: 80px;
`
const StyledBall = styled.div`
  margin: 15px;
  padding: 10px;
  border: 1px dashed #eaeaea;
  background: #fff;
  display: flex;
  justify-content: space-between;
`
const LayoutAside = styled.div`
  button{
    font-size: 12px;
    border: 0;
    padding: 0;
    margin: 5px;
    text-align: center;
    background: transparent;
  }
`
const LayoutMain = styled.div`
  flex: 1;
  span{
    display: inline-block;
    margin: 5px;
  }
`
const Button = styled.button`
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  display: block;
  color: inherit;
  text-align: center;
  background: transparent;
`
const PrimaryButton = styled(Button)`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  line-height: 50px;
  border-radius: 3px;
  background: #ccc;
  box-shadow: 0 0.03rem 0.05rem rgba(207, 162, 95, .58);
  background-image: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`

const Layer = function({ballPool, editHandle, removeHandle, createRandomBallsToPoolHandleClick}){
  return (
    <LayoutLayer>
      <LayoutScroller>
        <div>
          {ballPool.map((item, index) => {
            return <StyledBall key={index}>
              <LayoutMain>
                {item.red.map((item, index) => {
                  return <span key={index}>{item}</span>
                })}
                {item.blue.map((item, index) => {
                  return <span key={index}>{item}</span>
                })}
              </LayoutMain>
              <LayoutAside>
                <button onClick={() => editHandle(index)}>编辑</button>
                <button onClick={() => removeHandle(index)}>删除</button>
              </LayoutAside>
            </StyledBall>
          })}
        </div>

        <LayoutFixedBottom>
          <div style={{display: 'flex'}} className="u_m_xxx">
            <PrimaryButton onClick={() => redirect('/double_color_ball')}>手动添加</PrimaryButton>
            <PrimaryButton onClick={createRandomBallsToPoolHandleClick}>机选</PrimaryButton>
          </div>
        </LayoutFixedBottom>
      </LayoutScroller>
    </LayoutLayer>    
  )
}

class DoubleColorBall extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      editIndex: -1,
      redBalls: Util.creteNumSeriesString(1, 32),
      blueBalls: Util.creteNumSeriesString(1, 16),
      redBallPool: [],
      blueBallPool: [],
      ballPool: []
    }
  }

  redHandleClick = (e) => {
    const num  = e.currentTarget.getAttribute('data-num')

    if(this.state.redBallPool.indexOf(num) > -1){
      this.setState({ redBallPool: this.state.redBallPool.filter((item) => item !== num) })
    }else{
      // 限制判断
      if((this.state.redBallPool.length + 1) > config.double_color_ball.red.MAX){
        return
      }      
      this.setState({ redBallPool: [...this.state.redBallPool, num] })
    }
  }

  blueHandleClick = (e) => {
    const num  = e.currentTarget.getAttribute('data-num')

    if(this.state.blueBallPool.indexOf(num) > -1){
      this.setState({ blueBallPool: this.state.blueBallPool.filter((item) => item !== num) })
    }else{
      // 限制判断
      if((this.state.blueBallPool.length + 1) > config.double_color_ball.blue.MAX){
        return
      }      
      this.setState({ blueBallPool: [...this.state.blueBallPool, num] })
    }
  }

  // 生成机选号码 test ok
  randomBalls = () => {
    var redBalls = []
    var blueBalls = []

    while(redBalls.length < config.double_color_ball.red.MIN){
      var ball = String(Util.randomRangeNum(1, 32))
      if(redBalls.indexOf(ball) === -1){
        redBalls.push(ball)
      }
    }

    while(blueBalls.length < config.double_color_ball.blue.MIN){
      var ball = String(Util.randomRangeNum(1, 16))
      if(blueBalls.indexOf(ball) === -1){
        blueBalls.push(ball)
      }
    }

    return {
      red: redBalls,
      blue: blueBalls
    }    
  }

  createRandomBallsToPoolHandleClick = () => {
    const balls = this.randomBalls()
    this.setState({
      ballPool: [
        ...this.state.ballPool,
        { red: balls.red, blue: balls.blue }
      ]
    })    
  }

  createRandomBallsHandleClick = () => {
    const balls = this.randomBalls()

    this.setState({ 
      redBallPool: balls.red,
      blueBallPool: balls.blue
    })    
  }

  clearBalls = () => {
    this.setState({ redBallPool: [], blueBallPool: [] })
  }

  checkBallsIfMeetCondition = () => {
    const { redBallPool, blueBallPool } = this.state

    if(redBallPool.length > config.double_color_ball.red.MAX
      || redBallPool.length < config.double_color_ball.red.MIN){
        return false
      }

    if(blueBallPool.length > config.double_color_ball.blue.MAX
      || blueBallPool.length < config.double_color_ball.blue.MIN){
        return false
      }

    return true
  }

  submitHandleClick = () => {
    // 收集当前所选号码
    // 校验当前所选号码是否满足提交条件
    // 校验通过 加入号码列表池
    if(!this.checkBallsIfMeetCondition()){ 
      alert('所选号码不满足条件')
      return
    }

    this.setState({
      ballPool: [
        ...this.state.ballPool,
        { red: this.state.redBallPool, blue: this.state.blueBallPool }
      ]
    }, () => {
      this.clearBalls()
      redirect('/double_color_ball/layer')
    })
  }

  removeHandle = (index) => {
    this.setState({
      ballPool: this.state.ballPool.filter((item, _index) => _index !== index)
    })
  }

  editHandle = (index) => {
    // 1 切换视图到号码选择界面
    // 2 根据index从ballPoll中找出需要需要修改的号码
    // 3 将号码渲染到redBallPool和blueBallPool中
    // 4 编辑完成后切换视图到layer
    // 5 将页面号码更新到ballPool中
    // 6 清空redPool和bluePool
    const ball = this.state.ballPool.slice(index, index + 1)[0]
    this.setState({
      editing: true,
      editIndex: index,
      redBallPool: ball.red,
      blueBallPool: ball.blue
    }, () => {
      redirect('/double_color_ball')
    })
  }

  editCancelHandleClick = () => {
    this.setState({editing: false, editIndex: -1}, () => {
      this.clearBalls()
      redirect('/double_color_ball/layer')
    })
  }

  editDoneHandleClick = () => {
    if(!this.checkBallsIfMeetCondition()){ 
      alert('所选号码不满足条件')
      return
    }

    if(this.state.editIndex === -1){return}
    const newBall = {
      red: this.state.redBallPool, blue: this.state.blueBallPool
    }

    const newBallPool = this.state.ballPool.map((item, index) => {
      if(index === this.state.editIndex){
        return newBall
      }else{
        return item
      }
    })

    // 更新ballPool
    this.setState({ballPool: newBallPool, editing: false}, () => {
      this.clearBalls()
      redirect('/double_color_ball/layer')
    })
  }

  render() {
    const { ballPool, redBalls, blueBalls } = this.state
    return (
      <div>
        <StyledRedBalls>
          {redBalls.map((item) => <li
            key={item}
            data-num={item}
            data-pool="redBallPool"
            onClick={this.redHandleClick}
            className={(this.state.redBallPool.indexOf(item) > -1) ? 'active' : ''}>
              <div className="bg">{item}</div>
          </li>)}
        </StyledRedBalls>
        <StyledBlueBalls>
          {blueBalls.map((item) => <li
            key={item}
            data-num={item}
            data-pool="blueBallPool"
            onClick={this.blueHandleClick}
            className={(this.state.blueBallPool.indexOf(item) > -1) ? 'active' : ''}>
              <div className="bg">{item}</div>
          </li>)}
        </StyledBlueBalls>

        <LayoutFixedBottom>
          <StyledOperation>
            <LayoutFixed>
              <div className="block" onClick={this.clearBalls}>清空</div>
              <div className="block" onClick={this.createRandomBallsHandleClick}>机选</div>
            </LayoutFixed>
            {
              this.state.editing
                ? (
                  <div style={{display: 'flex'}}>
                    <div className="block" onClick={this.editCancelHandleClick}>取消</div>
                    <div className="block" onClick={this.editDoneHandleClick}>完成</div>
                  </div>
                )
                : <div className="block" onClick={this.submitHandleClick}>确定</div>
            }
          </StyledOperation>
        </LayoutFixedBottom>

        <Route path="/double_color_ball/layer" render={(props) => {
          return <Layer
            ballPool={ballPool}
            editHandle={this.editHandle}
            removeHandle={this.removeHandle}
            createRandomBallsToPoolHandleClick={this.createRandomBallsToPoolHandleClick} {...props}
          />
        }}/>
    
      </div>
    )
  }
}

export default DoubleColorBall

// 笔记

// 如何高亮选中的球呢？ 用数组的indexOf判检测当前号码是否存在于数组中方法

// 如果取消当前选中的球呢？ 从数组中删除当前点选的号码 参考方法splice slice

// 怎么判断当前点选是移除还是添加？ 使用filter方法遍历数组 存在 ? 移除 ：添加

// 号码选择数量限制放在哪里？ 在点选事件内部进行判断

// 怎么实现编辑？
