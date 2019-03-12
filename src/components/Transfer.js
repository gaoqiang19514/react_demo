import React, { Component } from 'react'
import styled from 'styled-components'

import closeIcon from '../asset/images/icon/close.png'
import showIcon from '../asset/images/icon/show.png'
import hideIcon from '../asset/images/icon/hide.png'
/*
 |--------------------------------------------------------------------------
 | button
 |--------------------------------------------------------------------------
 */
const Button = styled.button`
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  display: block;
  background: transparent;
`
const PrimaryButton = styled(Button)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  line-height: 50px;
  border-radius: 3px;
  box-shadow: 0 3px 5px rgba(207, 162, 95, .58);
  background: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`
const DisablePrimaryButton = styled(Button)`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 50px;
  border-radius: 3px;
  background: #ccc;
`
const MiniPrimaryButton = styled(Button)`
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 3px;
  background: -webkit-linear-gradient(47deg, #c89850, #e1c38c);
`
/*
 |--------------------------------------------------------------------------
 | input
 |--------------------------------------------------------------------------
 */
const Input = styled.input`
  border: 0;
  padding: 0;
  width: 100%;
  outline: none;
  color: inherit;
  font-size: inherit;
  -webkit-appearance: none;
  background: transparent;
`
const PrimaryInput = styled(Input)`
  color: #444;
  font-size: 16px;
  font-weight: bold;
  font-family: industry;
`
const MinPrimaryInput = styled(Input)`
  font-family: industry;
  font-size: 14px;
`

const Layout_M_XXX = styled.div`
  margin: 15px;
`
const LayoutGroup = styled.div`
  position: relative;
  display: flex;
  padding: 15px;
  align-items: center;
  &:after{
    content: " ";
    position: absolute;
    left: 15px;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  &:last-child:after{
    content: none;
  }
`
const LayoutBody = styled.div`
  flex: 1;
`
const LayoutFoot = styled.div`
  margin-left: 10px;
`

const StyledBg = styled.div`
  border-radius: 3px;
  background: #fff;
  box-shadow: 1px 1px 3px rgba(26, 26, 26, 0.1);
`

const StyledCleanIcon = styled.img`
  width: 25px;
  height: 25px;
`
const StyledToggleIcon = styled.img`
  width: 25px;
  height: 25px;
`

class Transfer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pass: false
    }
  }

  render() {

    return (
      <div>
        <Layout_M_XXX>
          <StyledBg>
            <LayoutGroup>
              <LayoutBody>
                <MinPrimaryInput placeholder="请输入转赠的积分" />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon src={closeIcon} alt="" />
                <StyledToggleIcon src={hideIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
            <LayoutGroup>
              <LayoutBody>
                <MinPrimaryInput placeholder="请输入对方名称" />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon src={closeIcon} alt="" />
                <StyledToggleIcon src={hideIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
            <LayoutGroup>
              <LayoutBody>
                <MinPrimaryInput placeholder="请输入对方登录账号" />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon src={closeIcon} alt="" />
                <StyledToggleIcon src={hideIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
            <LayoutGroup>
              <LayoutBody>
                <MinPrimaryInput placeholder="请输入交易密码" />
              </LayoutBody>
              <LayoutFoot>
                <StyledCleanIcon src={closeIcon} alt="" />
                <StyledToggleIcon src={hideIcon} alt="" />
              </LayoutFoot>
            </LayoutGroup>
          </StyledBg>
        </Layout_M_XXX>
        <Layout_M_XXX>
          {this.state.pass
            ? <PrimaryButton>转赠</PrimaryButton>
            : <DisablePrimaryButton>转赠</DisablePrimaryButton>}
        </Layout_M_XXX>
      </div>
    )
  }
}

export default Transfer