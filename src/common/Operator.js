import React from 'react';
import styled from 'styled-components'

const StyledOperator = styled.div`
  width: 105px;
  display: inline-block;
  vertical-align: middle;
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
const Operator = function({onChange, count}) {
  return (
    <StyledOperator>
      <span className="minus"></span>
      <input className="num" type="text" onChange={onChange} value={count}/>
      <span className="plus"></span>
    </StyledOperator>
  )
}

export default Operator