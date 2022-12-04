import React from "react";
import styled from "styled-components";
const StyledButton = styled.button`
    background-color: #5F021F;
    border: none;
    color: white;
    width: 300px;
    height: 50px;
    margin: 10px 10px 10px 20px;
    border-radius: 20px;

    &:active{
    background-color: #b19fa4;
  }
  
`
interface IButton {
    tabName: string
    onClick?: () => void;
}
const Button: React.FC<IButton> = (props) => {

    return (
        <StyledButton onClick={props.onClick}>{props.tabName}</StyledButton>
    )


}
export default Button;