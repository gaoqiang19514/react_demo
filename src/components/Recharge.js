import React, { Component } from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;

    p{
        margin: 0;
    }
`
const StyledItem = styled.li`
    width: 33.33%;
    text-align: center;
    padding: 10px;
`
class Recharge extends Component {

    render() {
        return (
            <div>
                <nav>
                    <a href="">中国移动</a>
                    <a href="">中国联通</a>
                    <a href="">中国电信</a>
                </nav>
                <main>
                    <input type="text"/>                    

                    <StyledList>
                        <StyledItem>
                            <p>10元</p>
                            <p>售价1060积分</p>
                        </StyledItem>
                        <StyledItem>
                            <p>10元</p>
                            <p>售价1060积分</p>
                        </StyledItem>
                        <StyledItem>
                            <p>10元</p>
                            <p>售价1060积分</p>
                        </StyledItem>
                        <StyledItem>
                            <p>10元</p>
                            <p>售价1060积分</p>
                        </StyledItem>
                        <StyledItem>
                            <p>10元</p>
                            <p>售价1060积分</p>
                        </StyledItem>
                    </StyledList>
                </main>
            </div>
        )
    }
}

export default Recharge