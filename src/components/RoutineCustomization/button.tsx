import React, { ReactElement } from 'react'
import {IRoutineCycle} from '../interfaces.js'
interface IButtonProps{
    buttonText: string
    onClickFunc?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Button: React.FC<IButtonProps> = props =>{
    let buttonStyle = "btn btn-secondary btn-outline-light rounded-0 "
    if(props.buttonText==="START")buttonStyle = "btn btn-light btn-outline-danger rounded-0 float-end"
    else if(props.buttonText==="REST DAY")buttonStyle = "btn btn-secondary btn-outline-light rounded-0 col-sm-12"
    else if(props.buttonText.includes("Day ") || props.buttonText==="REST DAY")buttonStyle = "btn btn-secondary btn-outline-light rounded-0 w-100"
    return(
        <button type="button" className={buttonStyle} onClick={props.onClickFunc}>{props.buttonText}</button>
    )
}

export default Button