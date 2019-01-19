import React, { Component } from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
    background: #fff;
`
const StyledList = styled.ul`
    list-style: none;
    padding: 5px 0;
    margin: 0 5px;
    display: flex;
    flex-wrap: wrap;
    p{
        margin: 0;
    }
    li{
        width: 33.33%;
        text-align: center;
    }
    .wrap{
        margin: 5px;
        padding: 10px 0;
        border: 1px solid #eaeaea;
        border-radius: 3px;
    }
    .title{
        margin-bottom: 5px;
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

`
const InputWrap = styled.div`
    padding: 15px;
    background: #fff;
`

const api = {
    fetchProducts: (type) => {
        return new Promise((resolve, reject) => {
            console.log(`拉取${type}`)
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
            setTimeout(() => {
                resolve(data);
            }, 2000)
        })
    }
}

class Recharge extends Component {
    state = {
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

    handleClick = (id) => {
        console.log(id)
    }

    navHandleClick = (type) => {
        // 根据type拉取产品列表
        api.fetchProducts(type)
            .then((res) => {
                this.setState({ products: res })
            })
            .catch((err) => {
            })
    }

    render() {
        return (
            <div>
                <StyledNav>
                    <Link onClick={() => this.navHandleClick(1)}>中国移动</Link>
                    <Link onClick={() => this.navHandleClick(2)}>中国联通</Link>
                    <Link onClick={() => this.navHandleClick(3)}>中国电信</Link>
                </StyledNav>
                <StyledMain>
                    <InputWrap>
                        <StyledInput type="text" placeholder="请输入手机号"/>                    
                    </InputWrap>
                    <StyledList>
                        {this.state.products.map(product => (
                            <li key={product.id} id={product.id} onClick={() => this.handleClick(product.id)}>
                                <div className="wrap">
                                    <p className="title">{product.amount}元</p>
                                    <p>售价{product.integral}积分</p>
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