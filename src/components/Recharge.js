import React, { Component } from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
`
const StyledList = styled.ul`
    list-style: none;
    padding: 10px 0;
    margin: 0 10px;
    display: flex;
    flex-wrap: wrap;
    p{
        margin: 0;
    }
    li{
        width: 33.33%;
        text-align: center;
        &.active .wrap{
            color: red;
            transition: all .3s;
        }
    }
    .wrap{
        margin: 5px;
        padding: 10px 0;
        border-radius: 3px;
        background: #fff;
    }
    .title{
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        font-size: 12px;
    }
`
const A = styled.a`
    color: #333;
    text-align: center;
    font-size: 12px;
    text-decoration: none;
`
const Link = styled(A)`
    font-size: 14px;
    line-height: 50px;
    height: 50px;
    flex: 1;
    transition: all .3s;
    &.active{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
`
const StyledNav = styled.nav`
    display: flex;
    background: #fff;
    margin-bottom: 15px;
`
const Input = styled.input`
    border: 0;
    padding: 0;
    outline: none;
    width: 100%;
`
const StyledInput = styled(Input)`
    font-size: 22px;
    font-weight: bold;
`
const InputWrap = styled.div`
    padding: 15px;
    margin: 0 15px;
    background: #fff;
    border-radius: 3px;
`

const api = {
    fetchProducts: (type) => {
        return new Promise((resolve, reject) => {
            const data = [
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d3cd57a', integral: 1060, amount: 10 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d33d57a', integral: 2010, amount: 20 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d34d57a', integral: 3180, amount: 30 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d35d57a', integral: 5300, amount: 40 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d36d57a', integral: 10600, amount: 50 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d37d57a', integral: 21200, amount: 60 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d38d57a', integral: 31800, amount: 70 },
                { id: 'ccd8105e-4bc5-40ac-ae44-cef48d39d57a', integral: 53000, amount: 80 }
            ]
            resolve(data);
        })
    }
}

class Recharge extends Component {
    state = {
        phone: '15014095291',
        currentProductIndex: 0,
        currentIndex: 1,
        products: []
    }

    componentDidMount() {
        api.fetchProducts(1)
            .then((res) => {
                this.setState({ products: res })
            })
            .catch((err) => {
            })
    }

    handleClick = (id, index) => {
        // 校验手机号输入
        if(!this.state.phone){
            alert('请输入手机号')
            return;
        }

        // 下一步要高亮当前点选块
        // 思路1 用一个index来表示
        this.setState({currentProductIndex: index})
    }

    handleChange = (e) => {
        this.setState({ phone: e.target.value })
    }

    navHandleClick = (type) => {
        this.setState({ currentIndex: type })
        // 根据type拉取产品列表
        api.fetchProducts(type)
            .then((res) => {
                this.setState({ products: res })
            })
            .catch((err) => {
            })
    }

    render() {
        const { currentIndex, currentProductIndex } = this.state

        return (
            <div>
                <StyledNav>
                    <Link className={currentIndex === 1 ? 'active' : ''} onClick={() => this.navHandleClick(1)}>中国移动</Link>
                    <Link className={currentIndex === 2 ? 'active' : ''} onClick={() => this.navHandleClick(2)}>中国联通</Link>
                    <Link className={currentIndex === 3 ? 'active' : ''} onClick={() => this.navHandleClick(3)}>中国电信</Link>
                </StyledNav>
                <StyledMain>
                    <InputWrap>
                        <StyledInput type="text" value={this.state.phone} onChange={this.handleChange} placeholder="请输入手机号"/>                    
                    </InputWrap>
                    <StyledList>
                        {this.state.products.map((product, index) => (
                            <li className={index === currentProductIndex ? 'active' : ''} key={product.id} id={product.id} onClick={() => this.handleClick(product.id, index)}>
                                <div className="wrap">
                                    <p className="title">{product.amount}元</p>
                                    <p>{product.integral}积分</p>
                                </div>
                            </li>
                        ))}
                    </StyledList>
                </StyledMain>
            </div>
        )
    }
}

export default Recharge