import React, { Component } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Menu from './Menu'
import api from '../api';

import kafei from '../asset/images/icon/kafei.png'
import biaoqian from '../asset/images/icon/biaoqian.png'
import goldCard from '../asset/images/goldCard.png' 

const S_nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
`
const S_link = styled(Link)`
  color: #333;
  font-size: 12px;
  width: 25%;
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
const S_box = styled.div`
  display: flex;
  margin: 0 5px;
`
const S_aside = styled.div`
  height: 170px;
  width: 50%;
  background: #fde6ea;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
`
const S_main = styled.main`
  width: 50%;
  margin-left: 10px;
`
const S_main_cell = styled.div`
  height: 80px;
  background: #f9f2e9;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  & + div{
    margin-top: 10px;
    background: #ecd0a3;
  }
`
const Item = function({to, icon, text}) {
  return (
    <S_link to={to}>
      <div className="wrap">
        <img src={icon} alt=""/>
        <div>{text}</div>
      </div>
    </S_link>
  )
}

class Public extends Component {

  componentWillMount() {
    // api.hotProducts()
    //   .then((res) => {
    //     const { data } = res
    //     console.log(data)
    //   })
  }

  render() {
    return (
      <div>

        <section>
          <h2 className="u_fs_xxx u_f_bold u_m_xxx">常用服务</h2>
          <div class="u_mx_xx">
            <S_nav>
              <Item to="/recharge" icon={kafei} text="充话费"/>
              <Item to="/recharge" icon={kafei} text="充流量"/>
              <Item to="/recharge" icon={kafei} text="充油卡"/>
              <Item to="/recharge" icon={kafei} text="信用卡还款"/>
              <Item to="/recharge" icon={kafei} text="腾讯Q币"/>
              <Item to="/recharge" icon={kafei} text="视频VIP"/>
              <Item to="/recharge" icon={kafei} text="电子卡券"/>
              <Item to="/double_color_ball" icon={kafei} text="双色球"/>
              <Item to="/recharge" icon={kafei} text="七乐彩"/>
            </S_nav>
          </div>
        </section>

        <section>
          <h2 className="u_fs_xxx u_f_bold u_m_xxx">商城专区</h2>
          <div class="u_mx_xx">
            <S_box>
              <S_aside></S_aside>
              <S_main>
                <S_main_cell></S_main_cell>
                <S_main_cell></S_main_cell> 
              </S_main>
            </S_box>
          </div>
        </section>

        <section>
          <h2 className="u_fs_xxx u_f_bold u_m_xxx">热卖产品</h2>
          <div class="u_mx_xx">

          </div>
        </section> 

      </div>
    )
  }
}

export default Public