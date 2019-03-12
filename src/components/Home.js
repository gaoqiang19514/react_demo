import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom"
import api from '../api'

import kafei from '../asset/images/icon/kafei.png'

const StyledNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
`
const StyledLink = styled(Link)`
  color: #333;
  width: 25%;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  img{
    display: block;
    width: 25px;
    height: 25px;
    margin: 0 auto 5px;
  }
  .wrap{
    margin: 5px;
    padding: 5px 0;
    border-radius: 3px; 
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }
`
const StyledMallEntry = styled.div`
  display: flex;
  .item{
    display: flex;
    flex-direction: column;
    flex: 1;
    .cell{
      flex: 1;
      height: 80px;
      padding: 10px;
      font-size: 16px;
      font-weight: bold;
      &--jd{
        color: #e36744;
        background: #fde6ea;
      }
      &--yx{
        color: #f19821;
        background: #f9f2e9;
      }
      &--zy{
        color: #fff;
        background: #ecd0a3;
      }
    }
  }
`
const LayoutList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const LayoutItem = styled.div`
  width: 50%;
`
const StyledProduct = styled.div`
 margin: 5px;
 padding: 10px;
 background: #fff;
 .img{
   margin-bottom: 10px;
 }
 .title{
    font-weight: bold;
    margin-bottom: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
 }
 .price{
    color: #f53415;
    font-weight: bold;
    font-family: industry;
    margin-bottom: 5px;
 }
 .info{
    display: flex;
    justify-content: space-between;
    .badge{
      font-size: 12px;
      padding: 2px 8px;
      color: #7e7e7e7e;
      border-radius: 3px;
      background: #f2f2f2;
    }
    .badge--active{
      color: #fff;
      background: #f63618;
    }
 }
`
const StyledHeader = styled.div`
  color: #fff;
  padding: 15px 15px 0 15px;
  background-image: linear-gradient(269deg,#C8AA86 4%,#AD8B62 96%);
`
const StyledUserinfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, .7);
  .info{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .mer{
    font-size: 12px;
  }
`
const StyledToggle = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`
const StyledBox = styled.div`
  color: #333;
  padding: 13px 15px 10px 15px;
  background-image: linear-gradient(180deg, #fafafa, #e7e7e7);
  border-radius: 3px 3px 0 0;
  .integral{
    margin-right: 3px;
    font-family: industry;
  }
  .badge{
    display: inline-block;
    font-size: 12px;
    padding: 2px 8px;
    color: #fff;
    border-radius: 3px;
    background: #a87d48;
    margin-left: 5px;
  }
  .link{
    color: #7e7e7e;
    font-size: 12px;
  }
`
const StyledIntegral = styled.div`
  display: flex;
  justify-content: space-between;
  color: #683f0c;
  margin-bottom: 10px;
`

const Item = ({to, icon, text}) => (
  <StyledLink to={to}>
    <div className="wrap">
      <img src={icon} alt=""/>
      <div>{text}</div>
    </div>
  </StyledLink>
)

const Product = ({id, title, price, url, status}) => {
  return (
    <LayoutItem>
      <a href={url}>
        <StyledProduct>
          <img className="img" src="http://img13.360buyimg.com/n0/jfs/t1/19531/26/3823/118504/5c2c35beE66ec977c/8133abedfda92680.jpg" alt=""></img>
          <div className="title">{title}</div>
          <div className="price">￥{price}</div>
          <div className="info">
            <span className="badge">{status}</span>
            <span className="badge badge--active">兑换</span>
          </div>
        </StyledProduct>
      </a> 
    </LayoutItem>
  )
}

export default class extends Component {
  state = {
    mer: '',
    integral: '',
    username: '',
    mobilePhone: '',
    items: []
  }

  componentDidMount() {
    api.getHotsell()
      .then(res => {
        const {data} = res
        this.setState({items: data})
      })
  }

  render() {
    return (
      <div>
        <StyledHeader>
          <StyledUserinfo>
            <StyledToggle>
              <img src={kafei} alt=""/>
            </StyledToggle>
            <div className="info">
              <div>高强 150****5291</div>
              <div className="mer">所属商户：BST演示商户</div>
            </div>
          </StyledUserinfo>
          <StyledBox>
            <StyledIntegral>
              <div><span className="integral">335</span>积分</div>
              <div>
                <Link to="/redeem" className="badge">赎回</Link>
                <Link to="/transfer" className="badge">转赠</Link>
              </div>
            </StyledIntegral>
            <a className="link">电子积分券</a>
          </StyledBox>
        </StyledHeader>
        <section>
          <h2 className="u_fStyledxxx u_f_bold u_mx_xxx u_my_xx">常用服务</h2>
          <div className="u_mx_xx">
            <StyledNav>
              <Item to="/recharge-phone" icon={kafei} text="充话费"/>
              <Item to="/recharge-flow" icon={kafei} text="充流量"/>
              <Item to="/recharge-oil" icon={kafei} text="充油卡"/>
              <Item to="/recharge-qb" icon={kafei} text="腾讯Q币"/>
              <Item to="/recharge-video" icon={kafei} text="视频VIP"/>
              <Item to="/double_color_ball" icon={kafei} text="电子卡券"/>
              <Item to="/double_color_ball" icon={kafei} text="双色球"/>
              <Item to="/double_color_ball" icon={kafei} text="七乐彩"/>
              <Item to="/double_color_ball" icon={kafei} text="违章查询"/>
              <Item to="/double_color_ball" icon={kafei} text="信用卡还款"/>
            </StyledNav>
          </div>
        </section>
        <section>
          <h2 className="u_fStyledxxx u_f_bold u_mx_xxx u_my_xx">商城专区</h2>
          <div className="u_mx_xx">
            <StyledMallEntry>
              <div className="item">
                <div className="cell cell--jd">京东商城</div>
              </div>
              <div className="item" style={{marginLeft: 10}}>
                <div className="cell cell--yx">
                  网易严选
                </div>
                <div className="cell cell--zy" style={{marginTop: 10}}>
                  自营商城
                </div>
              </div>
            </StyledMallEntry>
          </div>
        </section>
        <section>
          <h2 className="u_fStyledxxx u_f_bold u_mx_xxx u_my_xx">热卖商品</h2>
          <div className="u_mx_x u_my_x">
            <LayoutList>
              {this.state.items.map(item => (
                <Product 
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  status={item.status}
                />
              ))

              }
            </LayoutList>
          </div>
        </section>
      </div>
    )
  }
}