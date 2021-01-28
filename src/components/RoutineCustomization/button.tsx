import React, { ReactElement } from 'react'
import {IRoutineCycle} from '../interfaces.js'
interface IButtonProps{
    buttonText: string
    onClickFunc?: (event: React.MouseEvent<HTMLButtonElement>) => void
    active?: number
    editing?: boolean
}
const Button: React.FC<IButtonProps> = props =>{
    let buttonStyle = "btn button-RoutineCustomization rounded-0 "
    let isDraggable = false;
    if(props.editing)isDraggable = true;
    if(props.buttonText==="START")buttonStyle = "btn btn-light btn-outline-primary rounded-0 button-RoutineCustomization float-end"
    else if(props.buttonText.includes("Day "))buttonStyle = "btn dayButton-RoutineCustomization rounded-0 w-100 btn-primary"
    else if(props.buttonText.includes("Cycle ")){
        if(parseInt(props.buttonText.split(' ')[1])-1===props.active){
            buttonStyle= "btn btn-primary rounded-0 cycleButton-Shadow"
        }else{
            buttonStyle = "btn cycleButton rounded-0"
        }
    }
    return(
        <button type="button" draggable={isDraggable} className={buttonStyle} onClick={props.onClickFunc}>{props.buttonText}</button>
    )
}

export default Button