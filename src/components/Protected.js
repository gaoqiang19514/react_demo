import React, { Component } from 'react';
import { connect } from 'react-redux';

import api from '../api/protected';

class Protected extends Component {
    state = { list: [] }

    componentDidMount() {
        api.getUser()
            .then((res) => {
                const { data } = res;
                this.setState({
                    list: data.goals
                });
            })
            .catch((err) => {
            });
    }

    render() {
        const { list } = this.state;
        const { logout } = this.props;

        return (
            <div>
                <h1>Protected</h1>
                <ul>
                    {
                        list.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
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