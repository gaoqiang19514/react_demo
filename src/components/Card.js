import React, { Component } from 'react';
import styled from 'styled-components'

const StyledBox = styled.div`
    padding: 15px;
`
const LayoutBox = styled(StyledBox)`
    display: flex;
    align-items: center;
    background: #F5F5F5;
`
const LayoutFlex = styled.div`
    display: flex;
`

const StyledLogo = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 15px;
`
const StyledTitle = styled.h2`
    margin: 0;
    font-size: 16px;
    font-weight: bold;
`
const StyledOperate = styled(StyledBox)`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sub-text{
        color: #888;
        font-size: 12px;
    }
`
const Input = styled.input`
    outline: none;
    border: 0;
    padding: 0;
    width: 100%;
`

const InputBox = styled.div`
    width: 30px;
    input{
        text-align: center;
    }
`

const OperateBox = styled(LayoutFlex)`
    align-items: center;
`

class Card extends Component {
    state = {
        count: 1
    }

    handleChange = (e) => {
        this.setState({ count: e.target.value })
    }

    handleClick = (e) => {
        var sign = e.target.getAttribute('data-sign');
        
        // 怎样拦截不应该执行的操作？

        if(sign === 'increment'){
            this.setState({ count: this.state.count + 1 })
        }else if(sign === 'decrement'){
            this.setState({ count: this.state.count - 1 })
        }
    }

    render() {
        return(
            <div>
                {/* 头部 */}
                <StyledBox>
                    <LayoutBox>
                        <StyledLogo src="http://192.168.0.123:8023/portal/images/cards/bsk.png" alt=""/>
                        <StyledTitle>必胜客</StyledTitle>
                    </LayoutBox>
                </StyledBox>

                {/* 增减数量 */}
                <StyledOperate>
                    <div>兑换数量<span className="sub-text">(最多可购10张)</span></div>
                    <OperateBox>
                        <button onClick={this.handleClick} data-sign="decrement">-</button>
                        <InputBox>
                            <Input type="text" onChange={this.handleChange} value={this.state.count}/>
                        </InputBox>
                        <button onClick={this.handleClick} data-sign="increment">+</button>
                    </OperateBox>
                </StyledOperate>

                {/* 选择面值 */}

                {/* 产品详情 */}

                {/* 购买按钮 */}

            </div>
        )
    }
}

export default Card