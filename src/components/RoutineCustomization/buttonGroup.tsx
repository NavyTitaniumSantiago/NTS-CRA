import React, { ReactElement } from 'react'
import {IRoutineDay} from '../interfaces.js'
import Button from './button'

interface IButtonGroupProps{
    //vertical?: boolean
    cycleItem?: Array<IRoutineDay>
    cycleLength?: number 
    cart?:Array<string>
    day?: number
    cycleNum?: number
    onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const ButtonGroup: React.FC<IButtonGroupProps> = props =>{
    let buttonGroupStyle = "btn-group pe-auto  float-start"
    let buttonElements = props.cycleItem;
    //console.log(34, buttonElements)
    // if(props.vertical){
    //     buttonGroupStyle = "btn-group-vertical w-100"
    //     //buttonElements = props.cycle.Days
    // }else 
    if(props.cart){
        buttonElements = props.cart
    }else if(props.cycleItem && !props.cycleItem.length){
        buttonElements = [{Exercise: "REST DAY"}]
        buttonGroupStyle = "btn-group pe-auto w-100"
    }else if(props.cycleNum){
        buttonElements = new Array(props.cycleNum).fill(1)
    }
    console.log(111, props)
    return(
        <div className = "row dayRow border-top border-bottom me-0 ms-2">
            {(props.cart && !props.cart.length || props.cycleNum)  ? (null)
                : (<div className="col col-sm-1 p-0"><Button buttonText = {`Day ${props.day}`}/></div>)}
            <div className = "col col-sm-10">
                <div className={buttonGroupStyle} role="group" aria-label="">
                    {buttonElements && buttonElements.map((cyclingEle, idx)=>{
                        let buttonText = "REST DAY"
                        let keyValue = ''
                        let onClickFunc: (event: React.MouseEvent<HTMLButtonElement>) => void =(event) => event.preventDefault()
                        if(cyclingEle.Exercise){
                            buttonText = cyclingEle.Exercise
                            keyValue = "routineName"+cyclingEle.Exercise+idx
                        }
                        else if(props.cycleNum){
                            keyValue = "routineName"+"cycleNum"+cyclingEle+idx
                            buttonText = "Cycle " + (idx+1)
                            if(props.onClickHandler) onClickFunc = props.onClickHandler
                        }
                        return <Button buttonText = {buttonText} key={keyValue} onClickFunc = {onClickFunc}/>
                    })}
                </div>
            </div>
            {(props.cart && !props.cart.length || props.cycleNum)  ? (null)
                : (<div className="col col-sm-1 p-0"><Button buttonText = {"START"}/></div>)}
        </div>
    )
}

export default ButtonGroup