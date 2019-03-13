import React, { Component } from 'react';
import styled from 'styled-components'
import Operator from '../common/Operator'
import api from '../api'
const Flex = styled.div`
  display: flex;
`
const FlexBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Layout = styled(Flex)`
  justify-content: space-between;
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

const Lable = styled.div`
  padding: 10px 10px 15px 10px;
  background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMoaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ5QzNCOTcwN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5QzNCOTZGN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDlDM0I5NkI3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDlDM0I5NkM3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7R4hTYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF////7G1ti7Xo7PP8ncHs8Y2N/vDw7nt70OH2+93d+MPDuNLy9Kam7nV17+fthdCLygAAAFJJREFUKM9jYIAALkHsYAFUnqFJCSvQgMlPxK5fBibPjF2/0gaoPFshdgMCYAaYYNevApNnxa5fPAGmwAm7Ac4w+YPYDZCEyXPj8IHBaBBSIwgBrBY4UQ+sC74AAAAASUVORK5CYII=) -7px bottom repeat-x;
  background-size: 64px 5px;
`

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

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <section className="u_bg_white u_mb_xxx">
            <Lable>
              <p className="u_f_bold">高强 150****5291</p>
              <p>广东深圳市龙岗区杨美地铁站-C出口玛莎公寓</p>
            </Lable>
          </section>

          <section className="u_bg_white u_mb_xxx">
            <div className="u_p_xx u_fs_xxx u_f_bold">{this.state.merchant}</div>
            <Layout className="u_p_xx">
              <LayoutAside>
                <Profile src={this.state.img} alt=""/>
              </LayoutAside>
              <LayoutMain>
                <p className="u_f_bold u_fs_xx u_mb_x">{this.state.title}</p>
                <p className="u_fc_gray u_fs_x u_mb_x">37键彩色键帽--彩虹渐变</p>
                <FlexBetweenCenter>
                  <p className="u_fs_xxx u_fc_red">￥{this.state.price}</p>
                  <Operator onChange={this.handleChange} count={this.state.count}/>
                </FlexBetweenCenter>
              </LayoutMain>
            </Layout>
          </section>

          <section className="u_bg_white">
          <Layout className="u_p_xx">
            <LayoutAside>商品金额</LayoutAside>
            <LayoutMain>¥ 40.00</LayoutMain>
          </Layout>
          <Layout className="u_p_xx">
            <LayoutAside>运费</LayoutAside>
            <LayoutMain>¥ 10.00</LayoutMain>
          </Layout>
          <div className="u_p_xx u_text_right u_fs_xxx u_f_bold">
            总价：¥40.00
          </div>
          <div className="u_p_xx">
            <button className="btn bg_1">提交</button>
          </div>
        </section>
        </form>

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