import React, { Component } from 'react';
import styled from 'styled-components'
import Menu from './Menu'
import api from '../api';

import kafei from '../asset/images/icon/kafei.png'

const S_main = styled.main`
`

const S_nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
`
const S_section_head = styled.div`
  padding: 10px;
  h2{
    margin: 0;
    font-size: 16px;
  }
`
const S_section_main = styled.div`
  padding: 0 5px;
`
const S_link = styled.a`
  color: #333;
  font-size: 12px;
  width: 25%;
  text-align: center;
  text-decoration: none;
  img{
    display: block;
    margin: auto;
    width: 25px;
    height: 25px;
  }
  .wrap{
    margin: 5px;
    padding: 5px 0;
    border-radius: 3px; 
    background: #fff;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }
`

class Public extends Component {
  
  state = {
  }

  componentWillMount() {
    api.hotProducts()
      .then((res) => {
        const { data } = res
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        <Menu />
        <S_main>


          <section>
            <S_section_head>
              <h2>常用服务</h2>
            </S_section_head>
            <S_section_main>
              <S_nav>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>充话费</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>充流量</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>充油卡</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>信用卡还款</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>腾讯Q币</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>视频VIP</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>电子卡券</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>双色球</div>
                  </div>
                </S_link>
                <S_link href="">
                  <div className="wrap">
                    <img src={kafei} alt=""/>
                    <div>七乐彩</div>
                  </div>
                </S_link>
              </S_nav>
            </S_section_main>
          </section>

          <section>
            <S_section_head>
              <h2>商城专区</h2>
            </S_section_head>
            <S_section_main>
              
            </S_section_main>
          </section>

          <section>
            <S_section_head>
              <h2>热卖产品</h2>
            </S_section_head>
            <S_section_main>

            </S_section_main>
          </section>       

        </S_main>
      </div>
    )
  }
}

export default Public