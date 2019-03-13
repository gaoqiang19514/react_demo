import React, { Component } from 'react'
import styled from 'styled-components'

import Util from '../util'
import { redirect } from '../services/redirect'
import Operator from '../common/Operator'

const profileSrc = 'http://yanxuan.nosdn.127.net/63f5305881562d7dbf117d606381a8fe.png'

const StyledPage = styled.div`
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  dl{
    margin: 0;
  }
  dt{
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  dd{
    padding: 10px;
    margin: 0;
    font-size: 14px;
    color: #888;
  }
`
const Img = styled.img`
  display: block;
  max-width: 100%;
`
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledProfile = styled.div`
  background: #fff;
  margin-bottom: 10px;
`
const StyledInfo = styled.div`
  background: #fff;
  margin-bottom: 10px;
`
const StyledDetail = styled.div`
  background: #fff;
`
const LayoutFixedFull = styled.div`
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  &.active{
    display: block;
  }
`
const LayoutFixedBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
`

const Detail = function(){
  return (
    <StyledDetail>
      <dl>
        <dt>规格</dt>
        <dd>
          <ul>
            <li>
              <span>颜色</span>
              <span>藏青（内胆+外套）</span>
            </li>
            <li>
              <span>颜色</span>
              <span>藏青（内胆+外套）</span>              
            </li>
          </ul>
        </dd>
      </dl>
      <dl>
        <dt>详情信息</dt>
        <dd>
          <ul>
            <li>
              <span>长度</span>
              <span>29.5cm</span>
            </li>
            <li>
              <span>宽度</span>
              <span>29.5cm</span>              
            </li>
            <li>
              <span>长度</span>
              <span>29.5cm</span>
            </li>
            <li>
              <span>宽度</span>
              <span>29.5cm</span>              
            </li>
            <li>
              <span>长度</span>
              <span>29.5cm</span>
            </li>
            <li>
              <span>宽度</span>
              <span>29.5cm</span>              
            </li>                        
          </ul>          
        </dd>
      </dl>
    </StyledDetail>
  )
}

class Product extends Component {
  state = {
    count: 1,
    showLayerFlag: true
  }

  handleChange = (e) => {
    this.setState({count: e.target.value})
  }

  showLayerHandleClick = (e) => {
    const { showLayerFlag } = this.state
    this.setState({showLayerFlag: showLayerFlag ? false : true})
  }

  hideLayerHandleClick = (e) => {
    // 如果当前元素的祖先元素包含layer则直接返回
    if(!Util.closest(e.target, '.layer')){
      this.showLayerHandleClick()
    }
  }

  submitHandleClick = () => {
    redirect('/buy/15236')
  }

  render() {
    return (
      <StyledPage>
        <StyledProfile>
          <Img src={profileSrc} alt=""/>
        </StyledProfile>

        <StyledInfo>
          <FlexBox style={{padding: 10}}>
            <span style={{color: 'red', fontWeight: 'bold'}}>¥ 599</span>
            <span style={{fontSize: 14, color: '#555'}}>有货</span>
          </FlexBox>
          <div style={{padding: 10, fontSize: 16, fontWeight: 'bold', color: '#555'}}>
            日式和风懒人沙发
          </div>
        </StyledInfo>

        <Detail/>
        <div className="u_m_xxx">
          <button className="btn bg_1" onClick={this.showLayerHandleClick}>立即兑换</button>
        </div>
        <LayoutFixedFull onClick={this.hideLayerHandleClick} className={`layer ${this.state.showLayerFlag ? 'active' : ''}`}>
          <LayoutFixedBottom>
            <div>
              <div className="u_p_xxx">我的可用积分：590</div>
              <FlexBox className="u_p_xxx">
                <span>使用积分：</span>
                <span>11900</span>
              </FlexBox>
              <FlexBox className="u_p_xxx">
                <span>数量</span>
                <span>
                  <Operator onChange={this.handleChange} count={this.state.count}/>
                </span>
              </FlexBox>
            </div>
            <div className="u_p_xxx">
              <button className="btn bg_1" onClick={this.submitHandleClick}>确认</button>
            </div>
          </LayoutFixedBottom>
        </LayoutFixedFull>
      </StyledPage>
    )
  }
}

export default Product