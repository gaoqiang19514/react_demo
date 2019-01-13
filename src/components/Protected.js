import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';

import api from '../api';
import util from '../util';
import Menu from './Menu'

const S_main = styled.main`
  padding: 10px;
`

const STATUS_PROCESS = 'process'
const STATUS_SUCCESS = 'success'
const STATUS_FAILURE = 'failure'

class Protected extends Component {
    state = {}

    render() {
        const { logout } = this.props;

        return (
            <div>
                <Menu />
                <S_main>
                    Protected
                </S_main>
                <div className="btn-wrap">
                    <button onClick={ logout }>退出</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => { dispatch({ type: 'UNAUTH_USER' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Protected);