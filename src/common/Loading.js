import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledLoading = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  color: #fff;
  padding: 10px;
  font-weight: bold;
  background: rgba(0, 0, 0, .3);
`;

const Loading = ({show}) => show 
  ? <StyledLoading>Loading...</StyledLoading> 
  : null

const mapStateToProps = (state) => {
  return { show: state.loading.show }
}

export default withRouter(connect(mapStateToProps, null)(Loading))