import React, { Component } from 'react';
import { connect } from 'react-redux';

import api from '../api';
import util from '../util';

const linkStyle = {
    cursor: 'pointer',
    textDecoration: 'none'
}

const STATUS_PROCESS = 'process'
const STATUS_SUCCESS = 'success'
const STATUS_FAILURE = 'failure'

class Protected extends Component {
    state = { 
        status: STATUS_PROCESS,
        orderList: [],
        list: []
    }

    componentDidMount() {
        this.cancelable = util.makeCancelable(api.getUser())
        
        this.cancelable.promise.then((res) => {
            const { data } = res;
            this.setState({ list: data.goals });
        });

        api.getOrderList(this.state.status)
            .then((res) => {
                const { data } = res
                this.setState({
                    orderList: data
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
    }
    
    componentWillUnmount() {
        this.cancelable.cancel();
    }

    render() {
        const { list, status, orderList } = this.state;
        const { logout } = this.props;

        console.log(orderList)

        const List = list.map((item, index) => {
            return <li key={index}>{item}</li>
        })

        return (
            <div>
                <h1>Protected</h1>
                <ul>{ List }</ul>

                <nav>
                    <a style={ linkStyle }>处理中</a>
                    <a style={ linkStyle }>成功</a>
                    <a style={ linkStyle }>失败</a>
                </nav>

                <button onClick={ logout }>退出</button>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch({ type: 'UNAUTH_USER' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Protected);