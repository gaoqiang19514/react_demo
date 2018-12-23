import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import styled from 'styled-components';

const S_Loading = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;

    color: #fff;
    font-weight: bold;
    background: rgba(0, 0, 0, .3);
`;

class Loading extends Component {
    render() {
        const { loading } = this.props;
        return (
            loading ? <S_Loading>Loading...</S_Loading> : null
        )
    }
}

const mapStateToProps = (state) => {
    return { loading: state.loading.loading };
}

export default withRouter(connect(mapStateToProps, null)(Loading));