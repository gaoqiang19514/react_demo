import React, { Component } from 'react';
import styled from 'styled-components'

class Buy extends Component {
  
  render() {
    return (
      <div>
        Buy
      </div>
    )
  }
}

export default Buy

// 购买页需要商品的哪些信息？
// 1 商品名
// 2 价格
// 3 用户选择数量
// 4 规格（颜色 尺码）
// 5 商品id

// 怎么从详情页将点选商品的信息带过来？
// 1 只带id，到了buy页根据id查询商品信息自查
// 2 路由的state属性传递信息
