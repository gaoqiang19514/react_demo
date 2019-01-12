import React, { Component } from 'react'
import styled from 'styled-components'

const L_Container = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
`
const L_Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const L_Header = styled.div`
  line-height: 50px;
  background: #ccc;
`
const L_Main = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  overflow-y: auto;
`
const L_Footer = styled.div`
  line-height: 50px;
  background: #ccc;
`

export const Protal = (props) => {
  return(
    <L_Container>
      <L_Wrap>
        <L_Header>{ props.children[0] }</L_Header>
        <L_Main>{ props.children[1] }</L_Main>
      </L_Wrap>
    </L_Container>
  )
}
