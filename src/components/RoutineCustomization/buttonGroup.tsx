import React, { ReactElement } from 'react'
import {IRoutineDay} from '../interfaces.js'
import Button from './button'

interface IButtonGroupProps{
    cycleItem?: Array<IRoutineDay>
    cycleLength?: number 
    cart?:Array<string>
    day?: number
    cycleNum?: number
    currentCycle?: number
    editing?: boolean
    onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void
    sourceID?: Array<number>
    handleDragging?: (event: any, sourceID: Array<number>) => void
}
const ButtonGroup: React.FC<IButtonGroupProps> = props =>{

    //instructions text for edit area
    const instructionsText = ["-- Drag items here to move them between cycles or drag them directly to a different day.", <br/>,"-- Alternatively you can edit the sets by directly clicking on them.", <br/>, "-- To duplicate a set click on the '+' icon."]
    //default buttonGroupStyle applies to exercise list and edit area
    let buttonGroupStyle = "btn-group pe-auto float-start" 
    //buttonElements -> default buttonElements is for exercise list, the secondary is for cycle-tab-navigation
    let buttonElements = props.cycleItem;
    let buttonText = ''
    let keyValue = '' //keyvalue is react element key
    let onClickFunc: (event: React.MouseEvent<HTMLButtonElement>) => void =(event) => event.preventDefault()
    let handleDragging: (event: any, sourceID: Array<number>) => void =(event) => event.preventDefault()
    if(props.onClickHandler) onClickFunc = props.onClickHandler
    if(props.handleDragging) handleDragging = props.handleDragging
    if(props.cart){
        buttonElements = props.cart
    }else if(props.cycleNum){
        buttonElements = new Array(props.cycleNum).fill(1)
        buttonGroupStyle = "btn-group float-start"
    }

    return(
        <div className = "row dayRow me-0 ms-2">
            {/* ----DAY# BUTTON START---- */}
            {(props.cart || props.cycleNum)  ? (null)
                : (<div className="col col-sm-1 p-0"><Button handleDragging = {handleDragging} buttonText = {`Day ${props.day}`}/></div>)}
            {/* ----DAY# BUTTON END---- */}
            {/* ----HORIZONTAL LISTS GENERATOR START---- */}
            <div className = "col col-sm-10">
                {(props.cycleItem && !props.cycleItem.length) ? (<div className="fw-bold fs-1">REST DAY</div>):(
                <div className={buttonGroupStyle} role="group" aria-label="">
                    {(props.editing && props.cart &&!props.cart.length)?(<div className="buttonGroup-instruction-text">{instructionsText}</div>):(null)}
                    {buttonElements && buttonElements.map((cyclingEle, idx)=>{
                        let sourceID:Array<number> = []
                        if(props.sourceID) sourceID=[...props.sourceID]
                        // ----EXERCISE LISTS GENERATOR START----
                        if(cyclingEle.Exercise){
                            buttonText = cyclingEle.Exercise
                            keyValue = "routineName"+cyclingEle.Exercise+idx
                            sourceID.push(idx)
                        }
                        // ----CYCLE TAB NAVIGATION GENERATOR START---- 
                        else if(props.cycleNum){
                            keyValue = "routineName"+"cycleNum"+cyclingEle+idx
                            buttonText = "Cycle " + (idx+1)
                        }
                        return <Button handleDragging = {handleDragging} sourceID={sourceID} buttonText = {buttonText} key={keyValue} onClickFunc = {onClickFunc} active={props.currentCycle} editing={props.editing}/>
                    })}
                </div>)}
            </div>
            {/* ----HORIZONTAL LISTS GENERATOR END---- */}
            {(props.cart  || props.cycleNum || (props.cycleItem && !props.cycleItem.length))  ? (null)
                : (<div className="col col-sm-1 p-0"><Button buttonText = {"START"} handleDragging = {handleDragging}/></div>)}
        </div>
    )
}

export default ButtonGroup