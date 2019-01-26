import React, { Component } from 'react';
import styled from 'styled-components'
import api from '../api'
const Flex = styled.div`
  display: flex;
`
const Layout = styled(Flex)`

`
const LayoutAside = styled.div`
  margin-right: 10px;
`
const LayoutMain = styled.div`

`
const Img = styled.img`

`
const Profile = styled(Img)`
  width: 75px;
  height: 75px;
`

const OperatorStyled = styled.div`
  span,
  input {
    position: relative;
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #f7f7f7;
    text-align: center;
  }

  .num{
    -webkit-appearance: none;
    border-radius: 0;
    width: 45px;
    height: 30px;
    line-height: normal;
    border: 0;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    background: #f7f7f7;
    font-size: 12px;
    text-align: center;
  }

  .minus:after,
  .plus:after,
  .plus:before{
    position: absolute;
    left: 50%;
    top: 50%;
    content: "";
    width: 12px;
    height: 2px;
    margin: -1px 0 0 -6px;
    background: #999;
  }

  .plus:before {
    width: 2px;
    height: 12px;
    margin: -6px 0 0 -1px;
  }
`
const Operator = function(props){
  return (
    <OperatorStyled>
      <span className="minus"></span>
      <input className="num" type="text" onChange={props.onChange} value={props.count}/>
      <span className="plus"></span>
    </OperatorStyled>
  )
}

class Buy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      merchant: 'RK外设官方旗舰店',
      title: 'RK ABS 二色成型键帽 适用樱桃魔力鸭凯酷达尔优等机械键 37键彩色键帽--彩虹渐变',
      price: '40',
      count: 1,
      sku: 20,
      img: 'https://img10.360buyimg.com/mobilecms/s117x117_jfs/t24904/48/1762802430/218706/7a55b2a6/5bbb0feaNbb5e5595.jpg!q70.dpg.webp'
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    api.getProductById(id)
      .then((res) => {
        const {data} = res
        this.setState({...data})
      })
  }

  handleChange = (e) => {
    this.setState({count: e.target.value})
  }

  render() {

    console.log(this.state)

    return (
      <div>

        <section className="u_p_xx u_bg_white">
          <Layout>
            <LayoutAside>
              <Profile src={this.state.img} alt=""/>
            </LayoutAside>
            <LayoutMain>
              <p className="u_f_bold u_fs_xx">{this.state.title}</p>
              <p className="u_fc_gray">37键彩色键帽--彩虹渐变</p>
              <div>
                <p className="u_fs_xxx u_fc_red">￥{this.state.price}</p>
                <Operator onChange={this.handleChange} count={this.state.count}/>
              </div>
            </LayoutMain>
          </Layout>
        </section>

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


// 这种查一次就不会更新的数据 有用state的必要的？
  // api.getProductById(id)
  //   .then((res) => {
  //     const {data} = res
  //   })