import React, { Component } from 'react';
import styled from 'styled-components'

import config from '../config'

const StyledBox = styled.div`
    padding: 15px;
`
const LayoutBox = styled(StyledBox)`
    display: flex;
    align-items: center;
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

const StyledProducts = styled.ul`
    margin: 0 5px;
    padding: 0;
`

const StyledProduct = styled.li`
    margin: 5px;
    padding: 10px 20px;
    display: inline-block;
    list-style: none;
    border: 2px dashed #eaeaea;

    &.active{
        border-color: red;
    }
`

const LayoutFlexBet = styled.div`
    display: flex;
    justify-content: space-between;
`

const LayoutFixedBotton = styled(LayoutFlexBet)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    
    padding: 0 15px;
    line-height: 50px;
    background: #fff;
`

class Card extends Component {
    state = {
        count: 1,
        selectProductValue: 0,
        selectProductID: '',
        products: [
            { id: '660d923b-36b4-4a95-906a-2bc546bf9627', value: 1600, price: 10 },
            { id: '660d923b-36b4-4a95-906a-2bc526bf9627', value: 5300, price: 50 },
            { id: '660d923b-36b4-4a95-906a-2bc536bf9627', value: 10600, price: 100 },
            { id: '660d923b-36b4-4a95-906a-2bc556bf9627', value: 21200, price: 200 }
        ]
    }

    handleChange = (e) => {
        this.setState({ count: e.target.value })
    }

    handleClick = (e) => {
        var sign = e.target.getAttribute('data-sign');
        
        // 怎样拦截不应该执行的操作？
        if(sign === 'increment' && (this.state.count + 1 <= config.card.MAX_COUNT)){
            this.setState({ count: this.state.count + 1 })
        }else if(sign === 'decrement' && (this.state.count - 1 >= config.card.MIN_COUNT)){
            this.setState({ count: this.state.count - 1 })
        }
    }

    productHandleClick = (e) => {
        var id    = e.target.getAttribute('data-id');
        var value = e.target.getAttribute('data-value');
        this.setState({ selectProductID: id, selectProductValue: value })
    }

    submitHandleClick = () => {
        // 提交事件
        // 收集信息如下
        const { count, selectProductID } = this.state
        // 验证数据
        if(count > config.card.MAX_COUNT || count < config.card.MIN_COUNT){
            alert('数量不合法');
            return;
        }

        if(!selectProductID){
            alert('未选择商品');
            return;
        }
        alert('发送购买请求');
    }

    render() {
        const { products } = this.state
        let value = this.state.selectProductValue * this.state.count

        return(
            <div>
                {/* 头部 */}
                <StyledBox>
                    <LayoutBox>
                        <StyledLogo src="http://portal.ewoyin.com/portal/images/cards/bsk.png" alt=""/>
                        <StyledTitle>必胜客</StyledTitle>
                    </LayoutBox>
                </StyledBox>

                {/* 增减数量 */}
                <StyledOperate>
                    <div>兑换数量<span className="sub-text">(最多可购{config.card.MAX_COUNT}张)</span></div>
                    <OperateBox>
                        <button onClick={this.handleClick} data-sign="decrement">-</button>
                        <InputBox>
                            <Input type="text" onChange={this.handleChange} value={this.state.count}/>
                        </InputBox>
                        <button onClick={this.handleClick} data-sign="increment">+</button>
                    </OperateBox>
                </StyledOperate>

                {/* 选择面值 */}
                <h2>选择面值</h2>
                <StyledProducts>
                    {products.map((item) => 
                        <StyledProduct 
                            className={this.state.selectProductID === item.id ? 'active' : ''}
                            key={item.id} 
                            data-id={item.id}
                            data-value={item.value}
                            onClick={this.productHandleClick}>
                            {item.price}
                        </StyledProduct>
                    )}
                </StyledProducts>

                {/* 产品详情 */}

                {/* 购买按钮 */}
                <LayoutFixedBotton>
                    <span>兑换积分：{value}</span>
                    <span onClick={this.submitHandleClick}>立即兑换</span>
                </LayoutFixedBotton>
            </div>
        )
    }
}

export default Card